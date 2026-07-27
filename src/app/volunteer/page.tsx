import type { Metadata } from "next";
import { HandHeart, Clock, Users } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
  VolunteerForm,
} from "@/components";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Apply to volunteer with Dr. Winnie's Foundation — support menstrual health workshops, mentorship, kit assembly, and community outreach in Ghana.",
};

const volunteerHighlights = [
  {
    icon: HandHeart,
    title: "Meaningful Work",
    description:
      "Support workshops, mentorship sessions, and community events that directly impact girls' lives.",
  },
  {
    icon: Clock,
    title: "Flexible Commitment",
    description:
      "Choose from weekday, weekend, or as-needed availability that fits your schedule.",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description:
      "Join a team of passionate volunteers with orientation, training, and ongoing support.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Become a Volunteer"
        description="Share your time, skills, and compassion to help girls across Ghana thrive."
        backgroundImage={images.gallery.volunteerActivities}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Volunteer" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Why Volunteer With Us?"
                description="Volunteers are the heart of our foundation. Whether you facilitate workshops, assemble dignity kits, or mentor a girl, your contribution creates lasting change."
              />
              <ul className="mt-8 space-y-6">
                {volunteerHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E1E1E]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#1E1E1E]/70">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#F5FAFE] p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Volunteer Application
                </h2>
                <p className="mt-2 text-sm text-[#1E1E1E]/70">
                  Fill out the form below and our volunteer coordinator will
                  contact you within 5 business days.
                </p>
                <VolunteerForm className="mt-6" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Can't Volunteer Right Now?"
        description="You can still make a difference through a donation or partnership. Every form of support helps us reach more girls."
      />
    </>
  );
}
