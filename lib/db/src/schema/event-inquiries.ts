import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const eventInquiriesTable = pgTable("event_inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  telegramUsername: text("telegram_username"),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  guestCount: integer("guest_count").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
});

export type InsertEventInquiry = typeof eventInquiriesTable.$inferInsert;
export type EventInquiry = typeof eventInquiriesTable.$inferSelect;
