import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components";
import { images, projects } from "@/content";
import { ProjectsFilter } from "./ProjectsFilter";

export const metadata: Metadata = {
  title: "Projects & Campaigns",
  description:
    "Explore active, upcoming, and completed projects from Dr. Wynette's Foundation — including the flagship 1000 Girl Project.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects & Campaigns"
        description="From our flagship 1000 Girl Project to community pad drives and mentorship circles — see how we're making an impact."
        backgroundImage={images.projects.thousandGirl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Our Work in Action"
            description="Filter by status to explore active campaigns, upcoming initiatives, and completed projects."
            className="mb-10"
          />
          <ProjectsFilter projects={projects} />
        </Container>
      </section>
    </>
  );
}
