import type { Event } from "@/types";

function parseTimeTo24Hour(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hours: 9, minutes: 0 };

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
}

function parseEventTimes(
  date: string,
  timeRange: string
): { start: Date; end: Date } {
  const parts = timeRange.split(/[–—-]/).map((part) => part.trim());
  const startTime = parts[0] ?? "9:00 AM";
  const endTime = parts[1] ?? startTime;

  const startParts = parseTimeTo24Hour(startTime);
  const endParts = parseTimeTo24Hour(endTime);

  const start = new Date(`${date}T00:00:00`);
  start.setHours(startParts.hours, startParts.minutes, 0, 0);

  const end = new Date(`${date}T00:00:00`);
  end.setHours(endParts.hours, endParts.minutes, 0, 0);

  if (end <= start) {
    end.setHours(start.getHours() + 2);
  }

  return { start, end };
}

function formatGoogleCalendarDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

function formatIcsDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

/** Build a Google Calendar "add event" URL. */
export function getGoogleCalendarUrl(event: Event): string {
  const { start, end } = parseEventTimes(event.date, event.time);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatGoogleCalendarDate(start)}/${formatGoogleCalendarDate(end)}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Build an Outlook Web "add event" URL. */
export function getOutlookCalendarUrl(event: Event): string {
  const { start, end } = parseEventTimes(event.date, event.time);
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    body: event.description,
    location: event.location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/** Trigger a download of an ICS calendar file for an event. */
export function downloadIcsFile(event: Event): void {
  const { start, end } = parseEventTimes(event.date, event.time);
  const uid = `${event.slug}@drwynettesfoundation.org`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dr Wynette's Foundation//Events//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${event.title.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `LOCATION:${event.location.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${event.slug}.ics`;
  anchor.click();
  URL.revokeObjectURL(url);
}
