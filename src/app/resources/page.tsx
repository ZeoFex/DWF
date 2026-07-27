import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components";
import { images, resources } from "@/content";
import { ResourcesExplorer } from "./ResourcesExplorer";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse educational resources from Dr. Winnie's Foundation — guides, articles, videos, and FAQs on menstrual health, mental wellness, and career development.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Educational Resources"
        description="Free guides, articles, videos, and FAQs to support girls, parents, educators, and community leaders."
        backgroundImage={images.hero.programs}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Browse Our Library"
            description="Search and filter resources by topic or type. All materials are designed for practical use in schools and communities."
            className="mb-10"
          />
          <ResourcesExplorer resources={resources} />
          <p className="mt-10 text-center text-xs text-[#1E1E1E]/50">
            Resources are illustrative placeholders for website development.
            Verified materials will be published before launch.
          </p>
        </Container>
      </section>
    </>
  );
}
