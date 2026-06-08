import { logger } from "../lib/logger";

export type EventInquiryNotification = {
  fullName: string;
  phone: string;
  telegramUsername?: string | null;
  eventType: string;
  eventDate: string;
  guestCount: number;
  notes?: string | null;
};

function formatTelegramUsername(username?: string | null): string {
  if (!username?.trim()) return "N/A";
  const normalized = username.trim().replace(/^@+/, "");
  return normalized ? `@${normalized}` : "N/A";
}

export function formatEventInquiryTelegramMessage(
  inquiry: EventInquiryNotification,
): string {
  return [
    "☕ *NEW EVENT INQUIRY*",
    `👤 *Name:* ${inquiry.fullName}`,
    `📞 *Phone:* ${inquiry.phone}`,
    `✈️ *Telegram:* ${formatTelegramUsername(inquiry.telegramUsername)}`,
    `🎉 *Event:* ${inquiry.eventType}`,
    `📅 *Date:* ${inquiry.eventDate}`,
    `👥 *Guests:* ${inquiry.guestCount}`,
    `📝 *Notes:* ${inquiry.notes?.trim() || "None"}`,
  ].join("\n");
}

export async function sendTelegramNotification(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    logger.warn("Telegram credentials not configured; skipping notification");
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    logger.error(
      { status: response.status, body },
      "Failed to send Telegram notification",
    );
    throw new Error("Failed to send Telegram notification");
  }
}
