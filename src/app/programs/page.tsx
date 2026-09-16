import type { Metadata } from "next";
import {
  Container,
  CtaSection,
  PageHero,
  ProgramCard,
  SectionHeading,
} from "@/components";
import { images, programs } from "@/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Dr. Wynette's Foundation programs in menstrual health, mental wellness, and career development — empowering girls across Ghana.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Our Programs"
        description="Three integrated pillars addressing the whole person — physical health, emotional wellbeing, and career opportunity."
        backgroundImage={images.hero.programs}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Holistic Support for Every Girl"
            description="Each program is designed to stand alone while connecting to our broader mission. Together, they create pathways from health education to confident leadership."
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection
        title="Support Our Programs"
        description="Your contribution directly funds dignity kits, wellness circles, mentorship matches, and skills workshops for girls who need them most."
      />
    </>
  );
}
