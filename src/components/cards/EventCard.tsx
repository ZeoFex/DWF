import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Event, EventCategory } from "@/types";

const categoryLabels: Record<EventCategory, string> = {
  workshop: "Workshop",
  outreach: "Outreach",
  fundraiser: "Fundraiser",
  training: "Training",
  community: "Community",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.imageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold",
            event.isPast
              ? "bg-[#1E1E1E]/60 text-white"
              : "bg-[#782882] text-white"
          )}
        >
          {event.isPast ? "Past" : categoryLabels[event.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
          {event.title}
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-[#1E1E1E]/70">
          <li className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#46A0DC]" aria-hidden="true" />
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </li>
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#46A0DC]" aria-hidden="true" />
            {event.time}
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#46A0DC]" aria-hidden="true" />
            {event.location}
          </li>
        </ul>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#1E1E1E]/70 line-clamp-2">
          {event.description}
        </p>

        <Link
          href={event.registrationUrl ?? `/events#${event.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] transition-colors hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
        >
          {event.registrationRequired && !event.isPast
            ? "Register"
            : "View details"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
