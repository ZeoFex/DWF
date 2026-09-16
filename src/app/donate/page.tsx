import type { Metadata } from "next";
import { AlertTriangle, Lock, Shield } from "lucide-react";
import {
  Container,
  CtaSection,
  DonationForm,
  PageHero,
  SectionHeading,
} from "@/components";
import { images, impactData } from "@/content";
import { PAYMENT_DISCLAIMER } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Dr. Wynette's Foundation — donate to fund dignity kits, wellness programs, mentorship, and career development for girls in Ghana.",
};

interface DonatePageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const { project: defaultProjectSlug } = await searchParams;

  return (
    <>
      <PageHero
        title="Make a Donation"
        description="Your generosity fuels dignity kits, wellness circles, mentorship matches, and career workshops for girls across Ghana."
        backgroundImage={images.projects.thousandGirl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeading
                title="Donate Today"
                description="Choose an amount, select a project to support, and complete your donation. Every contribution makes a difference."
                className="mb-8"
              />
              <DonationForm defaultProjectSlug={defaultProjectSlug} />
            </div>

            <aside className="space-y-8 lg:col-span-2">
              {/* How donations are used */}
              <div className="rounded-2xl bg-[#F5FAFE] p-6">
                <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">
                  How Your Donation Helps
                </h2>
                <ul className="mt-4 space-y-4">
                  {impactData.donationUsage.map((item) => (
                    <li key={item.category}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[#1E1E1E]">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-[#46A0DC]">
                          {item.percentage}%
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#1E1E1E]/60">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-[#1E1E1E]/50">
                  Allocation percentages are illustrative for website development.
                </p>
              </div>

              {/* Security messaging */}
              <div className="rounded-2xl border border-[#782882]/20 bg-white p-6">
                <div className="flex items-start gap-3">
                  <Shield
                    className="h-6 w-6 shrink-0 text-[#782882]"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                      Secure & Transparent
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-[#1E1E1E]/70">
                      <li className="flex items-start gap-2">
                        <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        Donor information is kept confidential and never sold.
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        We publish annual impact reports with financial transparency.
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        Payment processing will use industry-standard encryption when live.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Demo disclaimer */}
              <div
                className="flex items-start gap-3 rounded-2xl border border-[#F0A070]/50 bg-[#F0A070]/10 p-5"
                role="note"
              >
                <AlertTriangle
                  className="h-5 w-5 shrink-0 text-[#8a6d1a]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    Demo Mode
                  </p>
                  <p className="mt-1 text-sm text-[#1E1E1E]/70">
                    {PAYMENT_DISCLAIMER}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Other Ways to Support"
        description="Can't donate right now? Volunteer your time or explore partnership opportunities to help us reach more girls."
      />
    </>
  );
}
