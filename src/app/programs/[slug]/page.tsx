import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Brain, Briefcase, Heart } from "lucide-react";
import {
  Button,
  Container,
  CtaSection,
  PageHero,
  ProjectCard,
  SectionHeading,
  TestimonialCard,
} from "@/components";
import { getProgramBySlug, getProjectBySlug, programs } from "@/content";
import type { ProgramSlug } from "@/types";

const iconMap = {
  heart: Heart,
  brain: Brain,
  briefcase: Briefcase,
} as const;

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug as ProgramSlug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  return {
    title: program.title,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug as ProgramSlug);

  if (!program) {
    notFound();
  }

  const Icon = iconMap[program.icon];
  const relatedProjects = program.relatedProjectSlugs
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter(Boolean);

  return (
    <>
      <PageHero
        title={program.title}
        description={program.shortDescription}
        backgroundImage={program.heroImageUrl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: program.title },
        ]}
      />

      {/* Intro */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="max-w-3xl">
              <SectionHeading title="Program Overview" />
              <p className="mt-4 text-lg leading-relaxed text-[#1E1E1E]/80">
                {program.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              eyebrow="The Challenge"
              title="Why This Program Matters"
              description={program.problem}
            />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
                Who We Serve
              </h3>
              <p className="mt-3 leading-relaxed text-[#1E1E1E]/80">
                {program.beneficiaries}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Activities & Approach */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title="What We Do" className="mb-6" />
              <ul className="space-y-3">
                {program.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex gap-3 text-[#1E1E1E]/80 leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#782882]"
                      aria-hidden="true"
                    />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title="Our Approach" className="mb-6" />
              <p className="leading-relaxed text-[#1E1E1E]/80">
                {program.approach}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-[#46A0DC]/5 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Program Impact"
            align="center"
            className="mb-10"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <p className="font-serif text-3xl font-bold text-[#46A0DC]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[#1E1E1E]/70">{stat.label}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-[#1E1E1E]/50">
            Figures are illustrative placeholders for website development.
          </p>
        </Container>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="Related Projects"
              description="Campaigns and initiatives connected to this program."
              className="mb-10"
            />
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map(
                (project) =>
                  project && (
                    <li key={project.slug}>
                      <ProjectCard project={project} />
                    </li>
                  )
              )}
            </ul>
          </Container>
        </section>
      )}

      {/* Gallery Preview */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Program in Action"
            description="Moments from workshops, outreach events, and community engagement."
            className="mb-10"
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
            {program.galleryImageUrls.map((url, index) => (
              <li
                key={url}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={url}
                  alt={`${program.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button href="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </div>
        </Container>
      </section>

      {/* Resources */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Program Resources"
            description="Guides, articles, and materials related to this program."
            className="mb-10"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {program.resources.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="group block rounded-2xl border border-[#46A0DC]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#782882]">
                    {resource.type}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-[#1E1E1E] group-hover:text-[#46A0DC]">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#1E1E1E]/70">
                    {resource.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#46A0DC]">
                    View resource
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button href="/resources" variant="secondary">
              Browse All Resources
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      {program.testimonials.length > 0 && (
        <section className="bg-[#F5FAFE] py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="What People Say"
              align="center"
              className="mb-10"
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {program.testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaSection
        title={`Support ${program.title}`}
        description="Help us reach more girls with dignity-centered programs. Donate, volunteer, or partner with us today."
      />
    </>
  );
}
