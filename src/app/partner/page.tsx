import type { Metadata } from "next";
import { Building2, Handshake, School } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  PartnersSection,
  PartnerForm,
  SectionHeading,
} from "@/components";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Partner with Dr. Wynette's Foundation — corporate sponsorship, school partnerships, in-kind donations, and community collaborations in Ghana.",
};

const partnershipTypes = [
  {
    icon: Building2,
    title: "Corporate Sponsorship",
    description:
      "Align your brand with meaningful community impact through campaign sponsorship, employee volunteering, and CSR initiatives.",
  },
  {
    icon: School,
    title: "School Partnerships",
    description:
      "Bring menstrual health, wellness, and career programs to your students with co-designed curricula and trained facilitators.",
  },
  {
    icon: Handshake,
    title: "Community Collaborations",
    description:
      "NGOs, faith organizations, and community groups can co-host outreach events, pad drives, and parent dialogues.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        title="Partner With Us"
        description="Together, we can reach more girls with comprehensive health, wellness, and career support."
        backgroundImage={images.gallery.communityOutreach}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Partner" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Partnership Opportunities"
            description="We welcome collaborations with businesses, schools, NGOs, and community leaders who share our commitment to empowering girls."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-3">
            {partnershipTypes.map((type) => {
              const Icon = type.icon;
              return (
                <li
                  key={type.title}
                  className="rounded-2xl border border-[#46A0DC]/10 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#782882]/10 text-[#782882]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#1E1E1E]">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1E1E1E]/70">
                    {type.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-[#F5FAFE] py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Start a Conversation"
                description="Tell us about your organization and how you'd like to partner. Our team will review your inquiry and respond within 5 business days."
              />
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <PartnerForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PartnersSection />
      <CtaSection />
    </>
  );
}
