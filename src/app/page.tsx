import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import {
  BlogCard,
  Button,
  CampaignProgress,
  Container,
  CtaSection,
  ImpactCounter,
  NewsletterSection,
  PartnersSection,
  ProgramCard,
  SectionHeading,
  TestimonialsSection,
} from "@/components";
import {
  getFeaturedProject,
  getLatestPosts,
  images,
  impactData,
  IMPACT_DATA_DISCLAIMER,
  programs,
  siteConfig,
} from "@/content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Dr. Wynette's Foundation empowers girls in Ghana through menstrual health education, mental wellness programs, and career development. Donate, volunteer, or partner with us today.",
};

export default function HomePage() {
  const featuredProject = getFeaturedProject();
  const latestPosts = getLatestPosts(3);
  const featuredStory = impactData.successStories[0];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Image
          src={images.hero.home}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#46A0DC]/95 via-[#46A0DC]/80 to-[#46A0DC]/60"
          aria-hidden="true"
        />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Empowering Communities Through Health Education, Menstrual Dignity
              and Youth Development.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button href="/donate" variant="coral" size="lg">
                Donate Now
              </Button>
              <Button
                href="/volunteer"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Become a Volunteer
              </Button>
              <Button
                href="/partner"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                Partner With Us
              </Button>
            </div>
            <p className="mt-8 text-sm font-medium text-white/80">
              Trusted by schools, volunteers, and community partners across Ghana
              · {impactData.statistics[0].value.toLocaleString()}
              {impactData.statistics[0].suffix} girls reached (illustrative)
            </p>
          </div>
        </Container>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={images.hero.about}
                alt="Foundation team engaging with students in a classroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Building Confident, Capable Leaders"
                description="Dr. Wynette's Foundation meets girls where they are — with health education, emotional support, and career opportunities designed to work together. We believe dignity, not charity, is the foundation of lasting change."
              />
              <p className="mt-4 text-[#1E1E1E]/75 leading-relaxed">
                From dignity kit distributions to mentorship circles and STEM
                workshops, our integrated approach ensures no girl&apos;s potential
                is left unrealized because of preventable barriers.
              </p>
              <Button href="/about" variant="secondary" className="mt-6">
                Discover Our Story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Focus Areas */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Programs"
            title="Three Pillars of Holistic Support"
            description="Each program addresses a critical need while connecting to our broader mission of empowering girls through health, wellness, and opportunity."
            align="center"
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

      {/* Impact Statistics */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Impact"
            title="Making a Difference Together"
            description="Every number represents a girl, a school, or a community touched by collective action."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {impactData.statistics.map((stat) => (
              <li key={stat.label}>
                <ImpactCounter stat={stat} />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-[#1E1E1E]/50">
            {IMPACT_DATA_DISCLAIMER}
          </p>
        </Container>
      </section>

      {/* Featured Campaign */}
      {featuredProject && (
        <section className="bg-[#46A0DC]/5 py-16 sm:py-20">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={featuredProject.heroImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeading
                  eyebrow="Featured Campaign"
                  title={featuredProject.title}
                  description={featuredProject.shortDescription}
                />
                {featuredProject.goal != null &&
                  featuredProject.raised != null && (
                    <div className="mt-6">
                      <CampaignProgress
                        goal={featuredProject.goal}
                        raised={featuredProject.raised}
                        currency={featuredProject.currency}
                      />
                      {featuredProject.girlsSupported != null && (
                        <p className="mt-3 text-sm text-[#1E1E1E]/70">
                          <strong className="text-[#1E1E1E]">
                            {featuredProject.girlsSupported.toLocaleString()}
                          </strong>{" "}
                          girls currently supported (illustrative)
                        </p>
                      )}
                    </div>
                  )}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href={`/donate?project=${featuredProject.slug}`}
                    variant="coral"
                  >
                    Donate to Campaign
                  </Button>
                  <Button href="/partner" variant="secondary">
                    Become a Sponsor
                  </Button>
                  <Button
                    href={`/projects/${featuredProject.slug}`}
                    variant="outline"
                  >
                    View Project Details
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Success Story */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={featuredStory.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Success Story"
                title={featuredStory.title}
                description={featuredStory.summary}
              />
              <blockquote className="mt-6 rounded-2xl bg-[#F5FAFE] p-6">
                <Quote
                  className="h-8 w-8 text-[#46A0DC]/30"
                  aria-hidden="true"
                />
                <p className="mt-3 text-base italic leading-relaxed text-[#1E1E1E]/80">
                  &ldquo;Before the program, I used to stay home every month. Now
                  I know how to manage and I don&apos;t feel ashamed anymore.&rdquo;
                </p>
                <footer className="mt-4 text-sm text-[#1E1E1E]/60">
                  — Ama K., Student · Partner School, Accra (illustrative)
                </footer>
              </blockquote>
              <Link
                href="/impact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
              >
                Read more success stories
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <TestimonialsSection />
      <PartnersSection />

      {/* Latest News */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Latest News"
            title="Updates From the Foundation"
            description="Stay informed about our programs, events, and community impact."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/blog" variant="outline">
              View All News
            </Button>
          </div>
        </Container>
      </section>

      <NewsletterSection />
      <CtaSection />
    </>
  );
}
