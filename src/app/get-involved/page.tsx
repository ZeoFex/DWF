import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HandHeart,
  Heart,
  Users,
} from "lucide-react";
import {
  Button,
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Dr. Wynette's Foundation — volunteer your time, partner with us, donate to our campaigns, or sponsor a girl's journey.",
};

const participationOptions = [
  {
    title: "Volunteer",
    description:
      "Join our team of dedicated volunteers supporting workshops, kit assembly, mentorship, and community outreach across Ghana.",
    href: "/volunteer",
    icon: HandHeart,
    cta: "Apply to Volunteer",
    variant: "primary" as const,
  },
  {
    title: "Partner With Us",
    description:
      "Schools, businesses, and community organizations can partner with us through sponsorships, in-kind donations, and program collaborations.",
    href: "/partner",
    icon: Building2,
    cta: "Start a Partnership",
    variant: "secondary" as const,
  },
  {
    title: "Donate",
    description:
      "Your financial support funds dignity kits, wellness programs, mentorship matches, and career development workshops for girls who need them most.",
    href: "/donate",
    icon: Heart,
    cta: "Make a Donation",
    variant: "coral" as const,
  },
];

const sponsorOptions = [
  {
    title: "Sponsor a Girl",
    description:
      "Provide comprehensive support for one girl — including health kits, mentorship sessions, and school-based workshops for a full program year.",
    href: "/donate",
    icon: Users,
    cta: "Sponsor a Girl",
  },
  {
    title: "Corporate Sponsorship",
    description:
      "Align your organization with meaningful community impact through campaign sponsorship, employee volunteering, and branded partnership opportunities.",
    href: "/partner",
    icon: Building2,
    cta: "Explore Corporate Options",
  },
  {
    title: "Fund an Outreach Event",
    description:
      "Sponsor a community health fair, pad drive, or wellness workshop — bringing direct support to underserved neighborhoods.",
    href: "/donate",
    icon: HandHeart,
    cta: "Fund an Event",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        description="Every contribution — time, partnership, or funding — helps us reach more girls with dignity-centered programs."
        backgroundImage={images.gallery.volunteerActivities}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Ways to Participate"
            title="Choose How You'd Like to Help"
            description="Whether you have an hour a week or resources to share, there's a meaningful way to join our mission."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-3">
            {participationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <li
                  key={option.title}
                  className="flex flex-col rounded-2xl border border-[#46A0DC]/10 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-[#1E1E1E]">
                    {option.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#1E1E1E]/70">
                    {option.description}
                  </p>
                  <Button
                    href={option.href}
                    variant={option.variant}
                    className="mt-6"
                  >
                    {option.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Sponsorship Opportunities"
            title="Make a Targeted Impact"
            description="Sponsor a girl, fund an outreach event, or explore corporate partnership options."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-3">
            {sponsorOptions.map((option) => {
              const Icon = option.icon;
              return (
                <li
                  key={option.title}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#782882]/10 text-[#782882]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#1E1E1E]">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1E1E1E]/70">
                    {option.description}
                  </p>
                  <Link
                    href={option.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
                  >
                    {option.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
