import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content";
import { images } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import type { SocialPlatform } from "@/types";

const siteUrl = getSiteUrl();

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Mail,
};

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dr. Winnie's Foundation in East Legon, Accra. Email, phone, office hours, and a contact form for inquiries about programs, volunteering, and partnerships.",
  openGraph: {
    title: "Contact Us | Dr. Winnie's Foundation",
    description:
      "Reach our team in Accra, Ghana — programs, volunteering, donations, and partnership inquiries welcome.",
    url: `${siteUrl}/contact`,
    images: [{ url: images.hero.contact, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  const { contact, social } = siteConfig;
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  const fullAddress = [
    contact.address.line1,
    contact.address.line2,
    `${contact.address.city}, ${contact.address.region}`,
    contact.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <PageHero
        title="Contact Us"
        description="We'd love to hear from you. Reach out about programs, volunteering, partnerships, donations, or general inquiries."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        backgroundImage={images.hero.contact}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Get in Touch"
                description="Our team typically responds within two business days. For urgent matters, WhatsApp is often the fastest way to reach us."
              />

              <ul className="mt-8 space-y-6">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-[#46A0DC]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-[#1E1E1E]/60">
                        Email
                      </span>
                      <span className="block font-medium text-[#1E1E1E] group-hover:text-[#46A0DC]">
                        {contact.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-[#46A0DC]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-[#1E1E1E]/60">
                        Phone
                      </span>
                      <span className="block font-medium text-[#1E1E1E] group-hover:text-[#46A0DC]">
                        {contact.phone}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#1E1E1E]/50">
                        Illustrative placeholder number
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 rounded-xl p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-[#1E1E1E]/60">
                      Office Address
                    </span>
                    <address className="mt-1 not-italic font-medium text-[#1E1E1E]">
                      {contact.address.line1}
                      {contact.address.line2 && (
                        <>
                          <br />
                          {contact.address.line2}
                        </>
                      )}
                      <br />
                      {contact.address.city}, {contact.address.region}
                      <br />
                      {contact.address.country}
                    </address>
                  </span>
                </li>
                <li className="flex items-start gap-4 rounded-xl p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-[#1E1E1E]/60">
                      Office Hours
                    </span>
                    <ul className="mt-1 space-y-1 text-sm text-[#1E1E1E]">
                      <li>{contact.hours.weekdays}</li>
                      {contact.hours.saturday && (
                        <li>{contact.hours.saturday}</li>
                      )}
                      {contact.hours.sunday && <li>{contact.hours.sunday}</li>}
                    </ul>
                    {contact.hours.note && (
                      <p className="mt-2 text-xs text-[#1E1E1E]/60">
                        {contact.hours.note}
                      </p>
                    )}
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1E1E1E]/60">
                  Follow Us
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {social.map((link) => {
                    const Icon = socialIcons[link.platform];
                    return (
                      <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-full bg-[#46A0DC]/10 text-[#46A0DC]",
                          "transition-colors hover:bg-[#46A0DC] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Send a Message
                </h2>
                <p className="mt-2 text-sm text-[#1E1E1E]/70">
                  Complete the form below and our team will get back to you.
                </p>
                <ContactForm className="mt-6" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <SectionHeading
            title="Find Our Office"
            description="Visit us by appointment in East Legon, Accra. The map below uses an embed URL when configured."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-[#46A0DC]/10 shadow-sm">
            {mapsEmbedUrl ? (
              <iframe
                title="Dr. Winnie's Foundation office location on Google Maps"
                src={mapsEmbedUrl}
                className="aspect-video w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-[#46A0DC]/10 to-[#782882]/10 px-6 text-center">
                <MapPin
                  className="h-12 w-12 text-[#46A0DC]/40"
                  aria-hidden="true"
                />
                <p className="mt-4 font-serif text-xl font-semibold text-[#1E1E1E]">
                  Map Preview
                </p>
                <p className="mt-2 max-w-md text-sm text-[#1E1E1E]/70">
                  Set{" "}
                  <code className="rounded bg-white/60 px-1.5 py-0.5 text-xs">
                    NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL
                  </code>{" "}
                  in your environment to display an interactive map.
                </p>
                <p className="mt-4 text-sm font-medium text-[#46A0DC]">
                  {fullAddress}
                </p>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-semibold text-[#782882] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
                >
                  Open in Google Maps
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
