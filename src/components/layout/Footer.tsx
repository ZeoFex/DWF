import Link from "next/link";
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { navigation, programs, siteConfig } from "@/content";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { SocialPlatform } from "@/types";

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Heart,
};

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/90">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1E1E] rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact, social } = siteConfig;
  const getInvolved = navigation.find((item) => item.label === "Get Involved");
  const quickLinks = navigation.filter(
    (item) => !["Get Involved", "Our Programs"].includes(item.label)
  );

  const programLinks = programs.map((p) => ({
    label: p.title,
    href: `/programs/${p.slug}`,
  }));

  const involvedLinks =
    getInvolved?.children?.map((c) => ({ label: c.label, href: c.href })) ?? [
      { label: "Volunteer", href: "/volunteer" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Donate", href: "/donate" },
    ];

  const moreLinks = [
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Get Involved", href: "/get-involved" },
  ];

  const address = [
    contact.address.line1,
    contact.address.line2,
    `${contact.address.city}, ${contact.address.region}`,
    contact.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-[#1E1E1E] text-white" role="contentinfo">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo
              variant="dark"
              className="focus-visible:ring-white focus-visible:ring-offset-[#1E1E1E]"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <Button href="/donate" variant="coral" className="mt-6">
              Donate Now
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <FooterLinkGroup
              title="Quick Links"
              links={[
                ...quickLinks.map((l) => ({ label: l.label, href: l.href })),
                ...moreLinks,
              ]}
            />
            <FooterLinkGroup title="Programs" links={programLinks} />
            <FooterLinkGroup title="Get Involved" links={involvedLinks} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{address}</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
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
                      "flex h-10 w-10 items-center justify-center rounded-full bg-white/10",
                      "transition-colors hover:bg-[#46A0DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1E1E]"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-12">
          <div className="max-w-md">
            <h3 className="font-serif text-lg font-semibold">Stay Connected</h3>
            <p className="mt-2 text-sm text-white/70">
              Get updates on programs, events, and impact stories.
            </p>
            <NewsletterForm className="mt-4" variant="dark" />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              Terms & Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
