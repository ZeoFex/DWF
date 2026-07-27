import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Button,
  CampaignProgress,
  Container,
  CtaSection,
  PageHero,
  PartnerLogo,
  SectionHeading,
} from "@/components";
import { getProjectBySlug, projects } from "@/content";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const statusLabels = {
  active: "Active Campaign",
  upcoming: "Upcoming",
  completed: "Completed",
} as const;

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isFundraising =
    project.status === "active" &&
    project.goal != null &&
    project.raised != null;

  return (
    <>
      <PageHero
        title={project.title}
        description={project.shortDescription}
        backgroundImage={project.heroImageUrl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      {/* Overview */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="inline-block rounded-full bg-[#782882]/15 px-3 py-1 text-xs font-semibold text-[#782882]">
                {statusLabels[project.status]}
              </span>
              <SectionHeading
                title="About This Project"
                className="mt-4"
              />
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-[#1E1E1E]/60">
                    Location
                  </dt>
                  <dd className="mt-1 text-[#1E1E1E]">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[#1E1E1E]/60">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-[#1E1E1E]">
                    {formatDate(project.timeline.start)}
                    {project.timeline.end &&
                      ` — ${formatDate(project.timeline.end)}`}
                  </dd>
                </div>
                {project.girlsSupported != null && (
                  <div>
                    <dt className="text-sm font-medium text-[#1E1E1E]/60">
                      Girls Supported
                    </dt>
                    <dd className="mt-1 text-[#1E1E1E]">
                      {project.girlsSupported.toLocaleString()} (illustrative)
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {isFundraising && (
              <aside className="rounded-2xl bg-[#F5FAFE] p-6 shadow-sm">
                <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">
                  Support This Campaign
                </h2>
                <div className="mt-4">
                  <CampaignProgress
                    goal={project.goal!}
                    raised={project.raised!}
                    currency={project.currency}
                  />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    href={`/donate?project=${project.slug}`}
                    variant="coral"
                    fullWidth
                  >
                    Donate Now
                  </Button>
                  <Button href="/partner" variant="outline" fullWidth>
                    Become a Sponsor
                  </Button>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </section>

      {/* Activities */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title="Project Activities" className="mb-6" />
              <ul className="space-y-3">
                {project.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex gap-3 text-[#1E1E1E]/80 leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#46A0DC]"
                      aria-hidden="true"
                    />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title="Expected Impact" className="mb-6" />
              <ul className="space-y-3">
                {project.impact.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[#1E1E1E]/80 leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#782882]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title="Project Milestones" className="mb-10" />
          <ol className="relative space-y-6 border-l-2 border-[#46A0DC]/20 pl-8">
            {project.timeline.milestones.map((milestone) => (
              <li key={milestone.date} className="relative">
                <span
                  className="absolute -left-[2.125rem] top-1 h-3 w-3 rounded-full border-2 border-[#46A0DC] bg-white"
                  aria-hidden="true"
                />
                <time
                  dateTime={milestone.date}
                  className="text-sm font-semibold text-[#782882]"
                >
                  {formatDate(milestone.date)}
                </time>
                <p className="mt-1 font-medium text-[#1E1E1E]">
                  {milestone.label}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Updates */}
      {project.updates.length > 0 && (
        <section className="bg-[#46A0DC]/5 py-16 sm:py-20">
          <Container>
            <SectionHeading title="Project Updates" className="mb-10" />
            <ul className="space-y-6">
              {project.updates.map((update) => (
                <li
                  key={update.date}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <time
                    dateTime={update.date}
                    className="text-sm font-semibold text-[#782882]"
                  >
                    {formatDate(update.date)}
                  </time>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-[#1E1E1E]">
                    {update.title}
                  </h3>
                  <p className="mt-2 text-[#1E1E1E]/75 leading-relaxed">
                    {update.summary}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Sponsors */}
      {project.sponsors.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="Project Sponsors"
              description="Organizations supporting this initiative. (Placeholder logos for development.)"
              align="center"
              className="mb-10"
            />
            <ul className="flex flex-wrap items-center justify-center gap-8">
              {project.sponsors.map((sponsor) => (
                <li key={sponsor.name}>
                  <PartnerLogo
                    partner={{
                      id: sponsor.name,
                      name: sponsor.name,
                      logoUrl: sponsor.logoUrl,
                      description: `Sponsor of ${project.title}`,
                      isPlaceholder: true,
                    }}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Gallery */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading title="Project Gallery" className="mb-10" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
            {project.galleryImageUrls.map((url, index) => (
              <li
                key={url}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={url}
                  alt={`${project.title} photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection
        title={`Support ${project.title}`}
        description="Your donation or partnership helps us reach more girls with comprehensive health, wellness, and mentorship support."
      />
    </>
  );
}
