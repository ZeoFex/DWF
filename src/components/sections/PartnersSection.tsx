import { partners, PARTNERS_DISCLAIMER } from "@/content";
import { PartnerLogo } from "@/components/cards/PartnerLogo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface PartnersSectionProps {
  title?: string;
  description?: string;
  className?: string;
  showDisclaimer?: boolean;
}

export function PartnersSection({
  title = "Our Partners & Supporters",
  description = "Together with schools, community organizations, and corporate partners, we reach more girls with dignity-centered programs.",
  className,
  showDisclaimer = true,
}: PartnersSectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <Container>
        <SectionHeading
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <li key={partner.id}>
              <PartnerLogo partner={partner} />
            </li>
          ))}
        </ul>

        {showDisclaimer && (
          <p className="mt-8 text-center text-xs text-[#1E1E1E]/50">
            {PARTNERS_DISCLAIMER}
          </p>
        )}
      </Container>
    </section>
  );
}
