import type { Metadata } from "next";
import Image from "next/image";
import { Download, MapPin, Play, Video } from "lucide-react";
import {
  Button,
  Container,
  CtaSection,
  ImpactCounter,
  PageHero,
  SectionHeading,
} from "@/components";
import {
  galleryAlbums,
  images,
  impactData,
  IMPACT_DATA_DISCLAIMER,
} from "@/content";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See the impact of Dr. Wynette's Foundation — statistics, success stories, community reach, and annual reports across Ghana.",
};

export default function ImpactPage() {
  const workshopAlbum = galleryAlbums.find((a) => a.slug === "workshops");
  const eventsAlbum = galleryAlbums.find((a) => a.slug === "events");

  return (
    <>
      <PageHero
        title="Our Impact"
        description="Measuring change through girls reached, schools partnered, and communities transformed — one program at a time."
        backgroundImage={images.hero.impact}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Impact" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Impact at a Glance"
            description="Our work spans menstrual health, mental wellness, and career development — reaching girls across Greater Accra and the Eastern Region."
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

      {/* Program Breakdown */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Impact by Program"
            description="How our resources and reach are distributed across our three program pillars."
            align="center"
            className="mb-12"
          />
          <ul className="mx-auto max-w-3xl space-y-6">
            {impactData.programBreakdown.map((item) => (
              <li key={item.programSlug}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                      {item.programTitle}
                    </h3>
                    <p className="mt-1 text-sm text-[#1E1E1E]/70">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-serif text-2xl font-bold text-[#46A0DC]">
                    {item.percentage}%
                  </span>
                </div>
                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-[#46A0DC]/10"
                  role="progressbar"
                  aria-valuenow={item.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.programTitle}: ${item.percentage}% of impact`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#46A0DC] to-[#782882]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Locations */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Where We Work"
            description="Our programs reach communities across Greater Accra and the Eastern Region."
            className="mb-10"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Map-looking section */}
            <div
              className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#46A0DC]/10 via-[#782882]/10 to-[#F0A070]/10"
              aria-hidden="true"
            >
              <div className="absolute inset-0 opacity-20">
                <svg
                  viewBox="0 0 400 300"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle cx="180" cy="140" r="80" fill="#46A0DC" opacity="0.15" />
                  <circle cx="220" cy="120" r="50" fill="#782882" opacity="0.2" />
                  <circle cx="160" cy="180" r="40" fill="#F0A070" opacity="0.15" />
                  <circle cx="240" cy="160" r="30" fill="#E85A28" opacity="0.1" />
                </svg>
              </div>
              <div className="relative text-center">
                <MapPin className="mx-auto h-12 w-12 text-[#46A0DC]" />
                <p className="mt-3 font-serif text-xl font-semibold text-[#1E1E1E]">
                  Ghana
                </p>
                <p className="text-sm text-[#1E1E1E]/60">
                  Greater Accra & Eastern Region
                </p>
              </div>
            </div>

            {/* Accessible list fallback */}
            <div>
              <h3 className="sr-only">Community impact by location</h3>
              <ul className="space-y-4">
                {impactData.locations.map((location) => (
                  <li
                    key={location.name}
                    className="rounded-2xl border border-[#46A0DC]/10 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#782882]"
                        aria-hidden="true"
                      />
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">
                          {location.name}
                        </h4>
                        <p className="text-sm text-[#1E1E1E]/60">
                          {location.region}
                        </p>
                        <dl className="mt-2 flex gap-6 text-sm">
                          <div>
                            <dt className="text-[#1E1E1E]/50">Girls reached</dt>
                            <dd className="font-semibold text-[#46A0DC]">
                              {location.girlsReached.toLocaleString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[#1E1E1E]/50">Schools</dt>
                            <dd className="font-semibold text-[#46A0DC]">
                              {location.schoolsPartnered}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#1E1E1E]/50">
                Location data is illustrative for website development.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Success Stories */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Success Stories"
            description="Real change happens one girl at a time. These illustrative stories represent the transformations we witness in our programs."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-2">
            {impactData.successStories.map((story) => (
              <li
                key={story.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={story.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1E1E1E]/75">
                    {story.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Before & After */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Before & After"
            description="Illustrative comparisons showing the change our programs aim to create."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-3">
            {impactData.beforeAfterStories.map((story) => (
              <li
                key={story.id}
                className="rounded-2xl border border-[#46A0DC]/10 bg-white p-6 shadow-sm"
              >
                <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                  {story.title}
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E85A28]">
                      Before
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#1E1E1E]/75">
                      {story.before}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#782882]">
                      After
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#1E1E1E]/75">
                      {story.after}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Photo Section */}
      {workshopAlbum && (
        <section className="bg-[#46A0DC]/5 py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="Photos From the Field"
              description={workshopAlbum.description}
              className="mb-10"
            />
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
              {workshopAlbum.images.slice(0, 6).map((image) => (
                <li
                  key={image.url}
                  className="relative aspect-square overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
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
      )}

      {/* Video Section */}
      {eventsAlbum && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="Events & Highlights"
              description="Video highlights and event moments from our community engagement."
              className="mb-10"
            />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#1E1E1E]">
                <div className="text-center text-white">
                  <Play
                    className="mx-auto h-16 w-16 text-white/80"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm text-white/70">
                    Foundation highlight reel (placeholder)
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {eventsAlbum.images.slice(0, 3).map((image) => (
                  <li
                    key={image.url}
                    className="flex items-center gap-4 rounded-xl bg-[#F5FAFE] p-3"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#782882]">
                        <Video className="h-3.5 w-3.5" aria-hidden="true" />
                        Event highlight
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-[#1E1E1E]">
                        {image.caption}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Annual Reports */}
      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Annual Reports"
            description="Download our impact reports to learn about program outcomes, financial stewardship, and future goals."
            align="center"
            className="mb-12"
          />
          <ul className="mx-auto grid max-w-3xl gap-6">
            {impactData.annualReports.map((report) => (
              <li
                key={report.year}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <time
                    dateTime={String(report.year)}
                    className="text-sm font-semibold text-[#782882]"
                  >
                    {report.year}
                  </time>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-[#1E1E1E]">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#1E1E1E]/70">
                    {report.summary}
                  </p>
                </div>
                <a
                  href={report.downloadUrl}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#46A0DC] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </a>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-[#1E1E1E]/50">
            Reports are illustrative placeholders. Verified reports will be
            published following audit.
          </p>
        </Container>
      </section>

      {/* Donation Usage */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="How Donations Are Used"
            description="We prioritize direct program delivery while maintaining transparent, efficient operations."
            align="center"
            className="mb-12"
          />
          <ul className="mx-auto grid max-w-3xl gap-4">
            {impactData.donationUsage.map((item) => (
              <li
                key={item.category}
                className="rounded-2xl border border-[#46A0DC]/10 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-[#1E1E1E]">
                    {item.category}
                  </h3>
                  <span className="font-serif text-xl font-bold text-[#46A0DC]">
                    {item.percentage}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#1E1E1E]/70">
                  {item.description}
                </p>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#46A0DC]/10"
                  role="progressbar"
                  aria-valuenow={item.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.category}: ${item.percentage}%`}
                >
                  <div
                    className="h-full rounded-full bg-[#782882]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/donate" variant="coral" size="lg">
              Make a Donation
            </Button>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
