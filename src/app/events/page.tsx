import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getUpcomingEvents, getPastEvents } from "@/content";
import { images } from "@/content/images";
import { getEventSchema } from "@/lib/seo-schemas";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const upcoming = getUpcomingEvents();
const past = getPastEvents();

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming workshops, fundraisers, outreach days, and community events hosted by Dr. Wynette's Foundation across Greater Accra, Ghana.",
  openGraph: {
    title: "Events | Dr. Wynette's Foundation",
    description:
      "Join us at foundation events — register for workshops, galas, volunteer orientations, and community outreach days.",
    url: `${siteUrl}/events`,
    images: [{ url: images.gallery.events, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/events`,
  },
};

export default function EventsPage() {
  const eventSchemas = upcoming.map((event) =>
    getEventSchema(event, `${siteUrl}/events#${event.slug}`)
  );

  return (
    <>
      <JsonLd data={eventSchemas} />
      <PageHero
        title="Events"
        description="Connect with our community at workshops, fundraisers, volunteer orientations, and outreach days. Event listings are illustrative until officially confirmed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        backgroundImage={images.gallery.events}
      />
      <EventsPageContent upcoming={upcoming} past={past} />
    </>
  );
}
