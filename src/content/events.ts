import { images } from "@/content/images";
import type { Event } from "@/types";

/** Events — illustrative placeholder data, not confirmed schedules. */
export const events: Event[] = [
  {
    id: "evt-upcoming-1",
    slug: "1000-girl-launch-gala-2026",
    title: "1000 Girl Project — Mid-Campaign Celebration",
    category: "fundraiser",
    date: "2026-02-14",
    time: "6:00 PM – 9:00 PM",
    location: "Alisa Hotel, North Ridge, Accra",
    description:
      "Join us for an evening celebrating the progress of our flagship 1000 Girl Project. Enjoy dinner, live music, and stories from girls and mentors whose lives have been touched by the foundation. Funds raised support the next cohort of enrollees. (Illustrative event — confirm details before promotion.)",
    registrationRequired: true,
    registrationUrl: "/events/1000-girl-launch-gala-2026/register",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-2",
    slug: "volunteer-orientation-march-2026",
    title: "Volunteer Orientation — Spring 2026",
    category: "training",
    date: "2026-03-08",
    time: "10:00 AM – 1:00 PM",
    location: "Dr. Winnie's Foundation Office, East Legon, Accra",
    description:
      "New and returning volunteers are invited to our quarterly orientation. Learn about program updates, safeguarding policies, and sign up for upcoming workshop and outreach opportunities. Light refreshments provided. (Illustrative event.)",
    registrationRequired: true,
    registrationUrl: "/events/volunteer-orientation-march-2026/register",
    imageUrl: "https://images.unsplash.com/photo-1559027617-c481c8a0a0a0?w=1200&q=80",
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-3",
    slug: "menstrual-health-workshop-april-2026",
    title: "Menstrual Health Workshop for Educators",
    category: "workshop",
    date: "2026-04-18",
    time: "9:00 AM – 3:00 PM",
    location: "Ghana International School, Cantonments, Accra",
    description:
      "A full-day training for teachers, school nurses, and administrators on creating stigma-free environments and responding supportively to students' menstrual health needs. Certificate of participation provided. (Illustrative event.)",
    registrationRequired: true,
    registrationUrl: "/events/menstrual-health-workshop-april-2026/register",
    imageUrl: images.programs.menstrualHealth.hero,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-4",
    slug: "community-outreach-tema-may-2026",
    title: "Community Outreach Day — Tema",
    category: "outreach",
    date: "2026-05-10",
    time: "8:00 AM – 2:00 PM",
    location: "Community Center, Tema Community 4",
    description:
      "Volunteers and staff will host a community health fair featuring dignity kit distribution, wellness information booths, and career guidance sessions for girls and parents. Open to the public. (Illustrative event.)",
    registrationRequired: false,
    imageUrl: images.gallery.communityOutreach,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-past-1",
    slug: "pad-drive-kickoff-2025",
    title: "Accra Pad Drive Kickoff 2025",
    category: "fundraiser",
    date: "2025-06-15",
    time: "10:00 AM – 4:00 PM",
    location: "Makola Market Area, Accra",
    description:
      "Our community pad drive launched with collection stations across Accra. Volunteers gathered over 1,200 pad packs in a single day — an illustrative milestone that fueled distributions through the rest of the year.",
    registrationRequired: false,
    imageUrl: images.projects.padDrive,
    galleryImageUrls: [
      images.projects.padDrive,
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      "https://images.unsplash.com/photo-1559027617-c481c8a0a0a0?w=800&q=80",
    ],
    isPast: true,
    isIllustrative: true,
  },
  {
    id: "evt-past-2",
    slug: "wellness-circle-graduation-2025",
    title: "Wellness Circle Graduation Ceremony 2025",
    category: "community",
    date: "2025-08-22",
    time: "2:00 PM – 5:00 PM",
    location: "Partner School Auditorium, Tema",
    description:
      "Forty-eight girls graduated from our year-long wellness circle program, sharing personal reflections and receiving certificates. Parents and counselors joined the celebration. (Illustrative past event.)",
    registrationRequired: false,
    imageUrl: images.programs.mentalHealth.gallery[0],
    galleryImageUrls: [
      images.programs.mentalHealth.gallery[0],
      images.programs.mentalHealth.gallery[1],
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    ],
    isPast: true,
    isIllustrative: true,
  },
  {
    id: "evt-past-3",
    slug: "mentor-matching-day-2025",
    title: "Mentor Matching Day 2025",
    category: "community",
    date: "2025-02-15",
    time: "9:00 AM – 12:00 PM",
    location: "Dr. Winnie's Foundation Office, East Legon, Accra",
    description:
      "Seventy-eight girls met their mentors for the first time at our annual matching event. Icebreakers, goal-setting sessions, and a shared lunch kicked off the Mentor Circle 2025 program. (Illustrative past event.)",
    registrationRequired: true,
    imageUrl: images.projects.mentorCircle,
    galleryImageUrls: [
      images.projects.mentorCircle,
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    ],
    isPast: true,
    isIllustrative: true,
  },
];

/** Retrieve upcoming events sorted by date. */
export function getUpcomingEvents(): Event[] {
  return events
    .filter((event) => !event.isPast)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Retrieve past events sorted by date (most recent first). */
export function getPastEvents(): Event[] {
  return events
    .filter((event) => event.isPast)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Retrieve an event by slug. */
export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}
