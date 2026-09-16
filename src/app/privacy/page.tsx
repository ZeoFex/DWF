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
  title: "Privacy Policy",
  description:
    "Privacy Policy for Dr. Wynette's Foundation — how we collect, use, and protect personal information for visitors, donors, volunteers, and program participants in Ghana.",
  openGraph: {
    title: "Privacy Policy | Dr. Wynette's Foundation",
    description:
      "Learn how Dr. Wynette's Foundation handles your personal data in accordance with applicable privacy standards in Ghana.",
    url: `${siteUrl}/privacy`,
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function PolicySection({
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

export default function PrivacyPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how Dr. Wynette's Foundation collects, uses, and protects personal information."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="rounded-xl bg-[#F0A070]/15 px-4 py-3 text-sm text-[#1E1E1E]/80">
              <strong>Note:</strong> Contact details on this page (email, phone,
              and address) are illustrative placeholders for website development.
              Replace with verified foundation contact information before public
              launch.
            </p>

            <p className="mt-8 text-sm text-[#1E1E1E]/60">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-10 space-y-12">
              <PolicySection title="1. Introduction">
                <p>
                  Dr. Wynette&apos;s Foundation (&quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;) is a nonprofit organization based in Accra,
                  Ghana, dedicated to empowering girls through health, wellness,
                  and opportunity. This Privacy Policy describes how we collect,
                  use, disclose, and safeguard personal information when you visit
                  our website, donate, volunteer, register for events, subscribe
                  to our newsletter, or otherwise interact with us.
                </p>
                <p>
                  By using our website or providing personal information to us,
                  you agree to the practices described in this policy. If you do
                  not agree, please do not use our services or submit personal
                  data through our forms.
                </p>
              </PolicySection>

              <PolicySection title="2. Information We Collect">
                <p>We may collect the following categories of information:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Contact information:</strong> name, email address,
                    phone number, postal address, and organization name (for
                    partners).
                  </li>
                  <li>
                    <strong>Donation information:</strong> donation amount,
                    currency, optional dedication messages, and payment-related
                    metadata processed through third-party payment providers.
                  </li>
                  <li>
                    <strong>Volunteer and event registration data:</strong>{" "}
                    availability, skills, motivation statements, dietary or
                    accessibility requirements, and emergency contact details
                    where provided.
                  </li>
                  <li>
                    <strong>Program participation data:</strong> information
                    shared by schools, parents, guardians, or participants in
                    connection with foundation programs, subject to appropriate
                    consent.
                  </li>
                  <li>
                    <strong>Website usage data:</strong> IP address, browser
                    type, device information, pages visited, referring URLs, and
                    cookies or similar technologies.
                  </li>
                  <li>
                    <strong>Communications:</strong> content of messages you send
                    via contact forms, email, WhatsApp, or social media channels.
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="3. How We Use Your Information">
                <p>We use personal information to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Respond to inquiries and provide customer support;</li>
                  <li>Process donations, volunteer applications, and event registrations;</li>
                  <li>
                    Deliver and improve our programs for girls, schools, and
                    communities;
                  </li>
                  <li>
                    Send newsletters, impact updates, and event invitations (where
                    you have opted in);
                  </li>
                  <li>
                    Maintain safeguarding records and comply with child protection
                    obligations;
                  </li>
                  <li>
                    Analyze website usage to improve accessibility and content;
                  </li>
                  <li>
                    Comply with legal obligations, resolve disputes, and enforce
                    our agreements.
                  </li>
                </ul>
                <p>
                  We do not sell personal information. We do not use personal
                  data for unrelated commercial marketing without your consent.
                </p>
              </PolicySection>

              <PolicySection title="4. Legal Basis for Processing">
                <p>
                  Where applicable under Ghana&apos;s Data Protection Act, 2012
                  (Act 843) and related regulations, we process personal data
                  based on one or more of the following grounds:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Your consent (e.g., newsletter subscription);</li>
                  <li>
                    Performance of a contract or steps prior to entering a
                    contract (e.g., event registration);
                  </li>
                  <li>
                    Legitimate interests pursued by the foundation (e.g.,
                    improving our website), balanced against your rights;
                  </li>
                  <li>
                    Compliance with legal obligations (e.g., financial record
                    keeping for donations).
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="5. Cookies and Tracking Technologies">
                <p>
                  Our website may use cookies and similar technologies to remember
                  preferences, measure traffic, and improve user experience. You
                  can control cookies through your browser settings. Disabling
                  cookies may affect certain site features.
                </p>
                <p>
                  We may use privacy-respecting analytics tools to understand how
                  visitors use our site. Aggregated analytics data does not
                  personally identify you.
                </p>
              </PolicySection>

              <PolicySection title="6. Sharing and Disclosure">
                <p>We may share personal information with:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Service providers who assist with hosting, email delivery,
                    payment processing, and CRM systems, under contractual
                    confidentiality obligations;
                  </li>
                  <li>
                    Partner schools, counselors, or community organizations when
                    necessary to deliver programs and with appropriate safeguards;
                  </li>
                  <li>
                    Regulators, courts, or law enforcement when required by
                    applicable law;
                  </li>
                  <li>
                    Successors in the event of a merger, restructuring, or
                    transfer of foundation assets, with continued protection of
                    your data.
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="7. Data Retention">
                <p>
                  We retain personal information only as long as necessary for the
                  purposes described in this policy, unless a longer retention
                  period is required by law. Donation records may be retained for
                  accounting and audit purposes. Volunteer and safeguarding
                  records may be retained in accordance with nonprofit governance
                  and child protection requirements.
                </p>
              </PolicySection>

              <PolicySection title="8. Data Security">
                <p>
                  We implement reasonable administrative, technical, and
                  organizational measures to protect personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the Internet is
                  completely secure, and we cannot guarantee absolute security.
                </p>
              </PolicySection>

              <PolicySection title="9. Your Rights">
                <p>
                  Subject to applicable law in Ghana, you may have the right to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Access personal information we hold about you;</li>
                  <li>Request correction of inaccurate information;</li>
                  <li>Request deletion where legally permitted;</li>
                  <li>Withdraw consent for marketing communications;</li>
                  <li>Object to or restrict certain processing activities;</li>
                  <li>Lodge a complaint with the Data Protection Commission of Ghana.</li>
                </ul>
                <p>
                  To exercise these rights, contact us using the details in Section
                  12 below.
                </p>
              </PolicySection>

              <PolicySection title="10. Children's Privacy">
                <p>
                  Our programs serve girls and young women. We collect information
                  about minors only with appropriate consent from parents,
                  guardians, or schools, and in accordance with safeguarding
                  policies. Our general website is not directed at children under
                  13 to submit personal data independently. If you believe we have
                  collected a child&apos;s information improperly, please contact
                  us promptly.
                </p>
              </PolicySection>

              <PolicySection title="11. International Transfers">
                <p>
                  Our website may be hosted or supported by service providers
                  outside Ghana. Where personal data is transferred
                  internationally, we take steps to ensure appropriate safeguards
                  are in place consistent with applicable data protection
                  requirements.
                </p>
              </PolicySection>

              <PolicySection title="12. Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. The
                  &quot;Last updated&quot; date at the top will reflect the most
                  recent revision. Material changes will be posted on this page.
                  Continued use of our website after changes constitutes
                  acceptance of the updated policy.
                </p>
              </PolicySection>

              <PolicySection title="13. Contact Us">
                <p>
                  For privacy-related questions, data access requests, or
                  complaints, contact:
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
                  You may also use our{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-[#46A0DC] underline-offset-2 hover:underline"
                  >
                    contact form
                  </Link>
                  .
                </p>
              </PolicySection>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
