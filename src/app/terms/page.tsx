import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const lastUpdated = "July 20, 2026";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using the Dr. Wynette's Foundation website — donations, volunteering, content use, and legal terms governed by the laws of Ghana.",
  openGraph: {
    title: "Terms & Conditions | Dr. Wynette's Foundation",
    description:
      "Read the terms governing use of the Dr. Wynette's Foundation website and online services.",
    url: `${siteUrl}/terms`,
  },
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[#1E1E1E]/80">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website, making a donation, or submitting applications through our platform."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="rounded-xl bg-[#F0A070]/15 px-4 py-3 text-sm text-[#1E1E1E]/80">
              <strong>Note:</strong> Contact details referenced in these terms are
              illustrative placeholders for website development. Replace with
              verified foundation information before public launch.
            </p>

            <p className="mt-8 text-sm text-[#1E1E1E]/60">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-10 space-y-12">
              <TermsSection title="1. Acceptance of Terms">
                <p>
                  These Terms and Conditions (&quot;Terms&quot;) govern your access
                  to and use of the website operated by Dr. Wynette&apos;s
                  Foundation (&quot;Foundation,&quot; &quot;we,&quot; &quot;us,&quot;
                  or &quot;our&quot;), located at {contact.address.city},{" "}
                  {contact.address.country}. By accessing or using our website, you
                  agree to be bound by these Terms and our{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#46A0DC] underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  . If you do not agree, you must not use this website.
                </p>
              </TermsSection>

              <TermsSection title="2. About the Foundation">
                <p>
                  Dr. Wynette&apos;s Foundation is a nonprofit organization supporting
                  young women and girls in Ghana through menstrual health
                  education, mental wellness programs, and career development
                  initiatives. Content on this website — including impact figures,
                  event schedules, partner logos, and testimonials — may include
                  illustrative placeholder material marked as such until verified
                  and updated for public launch.
                </p>
              </TermsSection>

              <TermsSection title="3. Use of the Website">
                <p>You agree to use this website only for lawful purposes. You must not:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Attempt to gain unauthorized access to our systems or data;
                  </li>
                  <li>
                    Upload or transmit malicious code, spam, or harmful content;
                  </li>
                  <li>
                    Misrepresent your identity or affiliation when submitting forms;
                  </li>
                  <li>
                    Scrape, harvest, or reproduce site content for commercial use
                    without written permission;
                  </li>
                  <li>
                    Interfere with the proper functioning or security of the
                    website.
                  </li>
                </ul>
                <p>
                  We reserve the right to suspend or restrict access to users who
                  violate these Terms.
                </p>
              </TermsSection>

              <TermsSection title="4. Donations">
                <p>
                  Donations made through this website support the Foundation&apos;s
                  charitable programs. Unless otherwise stated:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Donations are voluntary gifts and generally non-refundable,
                    except where required by law or our written refund policy;
                  </li>
                  <li>
                    Online payment processing may be provided by third-party
                    processors subject to their own terms;
                  </li>
                  <li>
                    Demo or mock payment flows on development sites do not
                    constitute actual financial transactions;
                  </li>
                  <li>
                    Tax deductibility of donations depends on your jurisdiction
                    and the Foundation&apos;s registered status — consult a tax
                    advisor for guidance.
                  </li>
                </ul>
                <p>
                  We will use donations in accordance with our mission and
                  applicable nonprofit governance standards. Specific campaign
                  allocations may vary based on operational needs.
                </p>
              </TermsSection>

              <TermsSection title="5. Volunteer and Partnership Applications">
                <p>
                  Information submitted through volunteer, partner, contact, or
                  event registration forms must be accurate and complete. Submitting
                  an application does not guarantee acceptance. The Foundation
                  reserves the right to decline applications at its discretion,
                  including for safeguarding, capacity, or alignment reasons.
                </p>
                <p>
                  Volunteers and partners must comply with foundation policies,
                  including child safeguarding, confidentiality, and code-of-conduct
                  requirements communicated during onboarding.
                </p>
              </TermsSection>

              <TermsSection title="6. Intellectual Property">
                <p>
                  All content on this website — including text, graphics, logos,
                  photographs, videos, and design elements — is owned by or licensed
                  to Dr. Wynette&apos;s Foundation and protected by copyright and
                  other intellectual property laws.
                </p>
                <p>
                  You may view and share links to our content for personal,
                  non-commercial purposes. Reproduction, modification, or
                  distribution without prior written consent is prohibited, except
                  where permitted by fair use or applicable law.
                </p>
              </TermsSection>

              <TermsSection title="7. Third-Party Links and Services">
                <p>
                  Our website may contain links to third-party websites, social
                  media platforms, or services. We are not responsible for the
                  content, privacy practices, or availability of third-party sites.
                  Your use of third-party services is at your own risk and subject
                  to their terms.
                </p>
              </TermsSection>

              <TermsSection title="8. Disclaimer of Warranties">
                <p>
                  This website and its content are provided on an &quot;as is&quot;
                  and &quot;as available&quot; basis without warranties of any kind,
                  whether express or implied, including but not limited to implied
                  warranties of merchantability, fitness for a particular purpose,
                  or non-infringement.
                </p>
                <p>
                  Health, wellness, and educational content on this site is for
                  general informational purposes and does not constitute medical,
                  psychological, or legal advice. Always consult qualified
                  professionals for personal health or legal matters.
                </p>
              </TermsSection>

              <TermsSection title="9. Limitation of Liability">
                <p>
                  To the fullest extent permitted by the laws of Ghana, Dr.
                  Wynette&apos;s Foundation and its directors, staff, volunteers, and
                  agents shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages arising from your use of this
                  website, including loss of data, profits, or goodwill.
                </p>
                <p>
                  Our total liability for any claim relating to the website shall
                  not exceed the amount you paid to us through the website in the
                  twelve (12) months preceding the claim, or one hundred Ghana
                  cedis (GHS 100), whichever is greater.
                </p>
              </TermsSection>

              <TermsSection title="10. Indemnification">
                <p>
                  You agree to indemnify and hold harmless Dr. Wynette&apos;s
                  Foundation from any claims, damages, losses, or expenses
                  (including reasonable legal fees) arising from your violation of
                  these Terms or misuse of the website.
                </p>
              </TermsSection>

              <TermsSection title="11. Governing Law and Disputes">
                <p>
                  These Terms are governed by and construed in accordance with the
                  laws of the Republic of Ghana, without regard to conflict-of-law
                  principles. Any dispute arising under these Terms shall be subject
                  to the exclusive jurisdiction of the courts of Accra, Ghana,
                  unless otherwise required by mandatory applicable law.
                </p>
              </TermsSection>

              <TermsSection title="12. Changes to These Terms">
                <p>
                  We may revise these Terms at any time by posting an updated
                  version on this page. The &quot;Last updated&quot; date indicates
                  when changes were last made. Your continued use of the website
                  after changes are posted constitutes acceptance of the revised
                  Terms.
                </p>
              </TermsSection>

              <TermsSection title="13. Contact Information">
                <p>
                  For questions about these Terms, please contact:
                </p>
                <address className="not-italic">
                  <strong>{siteConfig.name}</strong>
                  <br />
                  {contact.address.line1}
                  <br />
                  {contact.address.line2 && (
                    <>
                      {contact.address.line2}
                      <br />
                    </>
                  )}
                  {contact.address.city}, {contact.address.region}
                  <br />
                  {contact.address.country}
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[#46A0DC] underline-offset-2 hover:underline"
                  >
                    {contact.email}
                  </a>
                  <br />
                  Phone: {contact.phone}
                </address>
                <p className="mt-4">
                  Or visit our{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-[#46A0DC] underline-offset-2 hover:underline"
                  >
                    contact page
                  </Link>
                  .
                </p>
              </TermsSection>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
