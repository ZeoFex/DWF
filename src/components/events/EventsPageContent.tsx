"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Images } from "lucide-react";
import { EventCard } from "@/components/cards/EventCard";
import { AddToCalendarButton } from "@/components/events/AddToCalendarButton";
import { EventCountdown } from "@/components/events/EventCountdown";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Event, EventCategory } from "@/types";

const categoryLabels: Record<EventCategory, string> = {
  workshop: "Workshop",
  outreach: "Outreach",
  fundraiser: "Fundraiser",
  training: "Training",
  community: "Community",
};

type FilterOption = "all" | EventCategory;

interface EventsPageContentProps {
  upcoming: Event[];
  past: Event[];
}

export function EventsPageContent({ upcoming, past }: EventsPageContentProps) {
  const [category, setCategory] = useState<FilterOption>("all");
  const nextEvent = upcoming[0] ?? null;

  const [registrationEvent, setRegistrationEvent] = useState<Event | null>(
    () =>
      upcoming.find((event) => event.registrationRequired) ??
      upcoming[0] ??
      null
  );

  const filteredUpcoming = useMemo(() => {
    if (category === "all") return upcoming;
    return upcoming.filter((event) => event.category === category);
  }, [category, upcoming]);

  const filteredPast = useMemo(() => {
    if (category === "all") return past;
    return past.filter((event) => event.category === category);
  }, [category, past]);

  const categories: FilterOption[] = [
    "all",
    "workshop",
    "outreach",
    "fundraiser",
    "training",
    "community",
  ];

  return (
    <>
      {nextEvent && (
        <section className="bg-[#46A0DC] text-white">
          <Container className="py-12 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#F0A070]">
                  Next Event
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
                  {nextEvent.title}
                </h2>
                <p className="mt-3 text-white/85">{nextEvent.location}</p>
                <div className="mt-6">
                  <AddToCalendarButton event={nextEvent} />
                </div>
              </div>
              <EventCountdown event={nextEvent} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <Container>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter events by category"
          >
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
                  category === value
                    ? "bg-[#46A0DC] text-white"
                    : "bg-[#46A0DC]/10 text-[#46A0DC] hover:bg-[#46A0DC]/20"
                )}
              >
                {value === "all" ? "All Events" : categoryLabels[value]}
              </button>
            ))}
          </div>

          <SectionHeading
            title="Upcoming Events"
            description="Join us at workshops, fundraisers, outreach days, and community gatherings across Greater Accra."
            className="mt-10"
          />

          {filteredUpcoming.length === 0 ? (
            <EmptyState
              title="No upcoming events in this category"
              description="Check back soon or browse other categories for new dates."
              className="mt-8"
            />
          ) : (
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((event) => (
                <li key={event.id} id={event.slug}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {registrationEvent && registrationEvent.registrationRequired && (
        <section className="bg-[#46A0DC]/5 py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <SectionHeading
                title="Event Registration"
                description="Reserve your spot for an upcoming event. Confirmation details will be sent by email."
              />
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <label htmlFor="registration-event" className="sr-only">
                  Select event to register
                </label>
                <select
                  id="registration-event"
                  value={registrationEvent.slug}
                  onChange={(e) => {
                    const selected = upcoming.find(
                      (event) => event.slug === e.target.value
                    );
                    if (selected) setRegistrationEvent(selected);
                  }}
                  className="mb-6 w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                >
                  {upcoming
                    .filter((event) => event.registrationRequired)
                    .map((event) => (
                      <option key={event.slug} value={event.slug}>
                        {event.title}
                      </option>
                    ))}
                </select>
                <EventRegistrationForm event={registrationEvent} />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Past Events"
            description="Browse highlights from previous foundation gatherings. Event schedules shown are illustrative until confirmed."
          />

          {filteredPast.length === 0 ? (
            <EmptyState
              title="No past events in this category"
              description="Try selecting a different category to see previous events."
              className="mt-8"
            />
          ) : (
            <ul className="mt-8 space-y-10">
              {filteredPast.map((event) => (
                <li
                  key={event.id}
                  className="grid gap-8 rounded-2xl border border-[#46A0DC]/10 bg-white p-6 shadow-sm lg:grid-cols-3 lg:p-8"
                >
                  <div className="lg:col-span-1">
                    <EventCard event={event} />
                  </div>
                  {event.galleryImageUrls &&
                    event.galleryImageUrls.length > 0 && (
                      <div className="lg:col-span-2">
                        <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                          Event Gallery
                        </h3>
                        <p className="mt-1 text-sm text-[#1E1E1E]/70">
                          Photos from {event.title}. Browse our full gallery
                          for more moments from the field.
                        </p>
                        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {event.galleryImageUrls.slice(0, 3).map((url) => (
                            <li
                              key={url}
                              className="relative aspect-square overflow-hidden rounded-xl"
                            >
                              <Image
                                src={url}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 200px"
                              />
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/gallery"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#46A0DC] transition-colors hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
                        >
                          <Images className="h-4 w-4" aria-hidden="true" />
                          View full photo gallery
                        </Link>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
