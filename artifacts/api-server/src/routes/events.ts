import { Router, type IRouter } from "express";
import { z, ZodError } from "zod";
import { CreateEventInquiryBody } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { eventInquiriesTable } from "@workspace/db/schema";
import { logger } from "../lib/logger";
import {
  formatEventInquiryTelegramMessage,
  sendTelegramNotification,
} from "../services/telegram";

const router: IRouter = Router();

const EventInquiryResponse = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  full_name: z.string(),
  phone: z.string(),
  telegram_username: z.string().optional(),
  event_type: z.string(),
  event_date: z.string(),
  guest_count: z.number().int(),
  notes: z.string().optional(),
  status: z.enum(["pending", "confirmed", "declined"]),
});

function formatEventDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

router.post("/events/inquire", async (req, res) => {
  try {
    const body = CreateEventInquiryBody.parse(req.body);
    const eventDate = formatEventDate(body.event_date);

    const [inserted] = await db
      .insert(eventInquiriesTable)
      .values({
        fullName: body.full_name,
        phone: body.phone,
        telegramUsername: body.telegram_username ?? null,
        eventType: body.event_type,
        eventDate,
        guestCount: body.guest_count,
        notes: body.notes ?? null,
        status: "pending",
      })
      .returning();

    if (!inserted) {
      throw new Error("Failed to persist event inquiry");
    }

    try {
      await sendTelegramNotification(
        formatEventInquiryTelegramMessage({
          fullName: inserted.fullName,
          phone: inserted.phone,
          telegramUsername: inserted.telegramUsername,
          eventType: inserted.eventType,
          eventDate: inserted.eventDate,
          guestCount: inserted.guestCount,
          notes: inserted.notes,
        }),
      );
    } catch (telegramError) {
      logger.error(
        { err: telegramError, inquiryId: inserted.id },
        "Event inquiry saved but Telegram notification failed",
      );
    }

    const response = EventInquiryResponse.parse({
      id: inserted.id,
      created_at: inserted.createdAt.toISOString(),
      full_name: inserted.fullName,
      phone: inserted.phone,
      telegram_username: inserted.telegramUsername ?? undefined,
      event_type: inserted.eventType,
      event_date: inserted.eventDate,
      guest_count: inserted.guestCount,
      notes: inserted.notes ?? undefined,
      status: inserted.status,
    });

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        title: "Validation Error",
        detail: error.errors.map((e) => e.message).join("; "),
      });
      return;
    }

    logger.error({ err: error }, "Failed to create event inquiry");
    res.status(500).json({
      title: "Server Error",
      detail: "Unable to process event inquiry at this time.",
    });
  }
});

export default router;
