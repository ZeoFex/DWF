import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryAlbums } from "@/content";
import { images } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos from Dr. Wynette's Foundation community outreach, school visits, workshops, events, and volunteer activities across Ghana.",
  openGraph: {
    title: "Photo Gallery | Dr. Wynette's Foundation",
    description:
      "Explore moments from our programs — community outreach, school visits, workshops, and volunteer activities.",
    url: `${siteUrl}/gallery`,
    images: [{ url: images.gallery.communityOutreach, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Photo Gallery"
        description="Moments from the field — outreach days, school visits, workshops, and celebrations with the girls and communities we serve."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        backgroundImage={images.gallery.communityOutreach}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Program Moments"
            description={`Filter by album to explore ${galleryAlbums.length} collections of illustrative photography. Replace with foundation-owned images before launch.`}
            className="mb-10"
          />
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
