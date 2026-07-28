import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  HandHeart,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  PartnersSection,
  SectionHeading,
  TeamCard,
} from "@/components";
import {
  getFounder,
  getTeamMembers,
  images,
  valuesData,
} from "@/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Dr. Winnie's Foundation — our story, vision, mission, values, and the team working to empower girls across Ghana.",
};

const valueIconMap = {
  compassion: Heart,
  empowerment: HandHeart,
  integrity: Shield,
  community: Users,
  education: BookOpen,
} as const;

export default function AboutPage() {
  const founder = getFounder();
  const team = getTeamMembers();

  return (
    <>
      <PageHero
        title="About Dr. Winnie's Foundation"
        description="Rooted in dignity, driven by community, and committed to every girl's right to health, wellness, and opportunity."
        backgroundImage={images.hero.about}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Story"
            title="How It All Began"
            className="mb-8"
          />
          <div className="prose prose-lg max-w-none space-y-4 text-[#1E1E1E]/80 leading-relaxed">
            {valuesData.aboutStory.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <article className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#46A0DC]">
                Our Vision
              </h2>
              <p className="mt-4 leading-relaxed text-[#1E1E1E]/80">
                {valuesData.vision}
              </p>
            </article>
            <article className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#782882]">
                Our Mission
              </h2>
              <p className="mt-4 leading-relaxed text-[#1E1E1E]/80">
                {valuesData.mission}
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Core Values"
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valuesData.coreValues.map((value) => {
              const Icon = valueIconMap[value.icon];
              return (
                <li
                  key={value.title}
                  className="rounded-2xl border border-[#46A0DC]/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#1E1E1E]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1E1E1E]/70">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-[#46A0DC]/5 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="Foundation Timeline"
            align="center"
            className="mb-12"
          />
          <ol className="relative mx-auto max-w-3xl space-y-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-[#46A0DC]/20 sm:before:left-1/2 sm:before:-translate-x-px">
            {valuesData.timeline.map((milestone, index) => (
              <li
                key={milestone.year}
                className={`relative flex flex-col sm:w-1/2 ${
                  index % 2 === 0
                    ? "sm:ml-0 sm:mr-auto sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <div
                  className={`absolute left-4 top-1 h-3 w-3 rounded-full border-2 border-[#46A0DC] bg-white sm:left-1/2 sm:-translate-x-1/2 ${
                    index % 2 === 0 ? "sm:left-auto sm:right-0 sm:translate-x-1/2" : ""
                  }`}
                  aria-hidden="true"
                />
                <article className="ml-10 rounded-2xl bg-white p-6 shadow-sm sm:ml-0">
                  <time
                    dateTime={String(milestone.year)}
                    className="text-sm font-semibold text-[#782882]"
                  >
                    {milestone.year}
                  </time>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-[#1E1E1E]">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1E1E1E]/70">
                    {milestone.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Founder */}
      {founder && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Leadership"
              title="Meet Our Founder"
              className="mb-10"
            />
            <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-16">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:col-span-2">
                <Image
                  src={founder.imageUrl}
                  alt={`Portrait of ${founder.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="lg:col-span-3">
                <h3 className="font-serif text-3xl font-bold text-[#1E1E1E]">
                  {founder.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-[#782882]">
                  {founder.role}
                </p>
                <p className="mt-6 leading-relaxed text-[#1E1E1E]/80">
                  {founder.bio}
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Team */}
      <section id="team" className="scroll-mt-28 bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Team"
            title="The People Behind the Mission"
            description="Dedicated professionals and volunteers working together to empower girls across Ghana."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li key={member.id}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PartnersSection />
      <CtaSection />
    </>
  );
}
