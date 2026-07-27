import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types";

interface PartnerLogoProps {
  partner: Partner;
  className?: string;
  grayscale?: boolean;
}

export function PartnerLogo({
  partner,
  className,
  grayscale = true,
}: PartnerLogoProps) {
  const content = (
    <div
      className={cn(
        "flex h-24 items-center justify-center rounded-2xl bg-white px-6 py-4 shadow-sm transition-all hover:shadow-md",
        grayscale && "grayscale hover:grayscale-0 motion-safe:duration-300",
        className
      )}
    >
      <div className="relative h-12 w-full max-w-[140px]">
        <Image
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          fill
          className="object-contain"
          sizes="140px"
        />
      </div>
    </div>
  );

  if (partner.website) {
    return (
      <Link
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${partner.name} website`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded-2xl"
      >
        {content}
      </Link>
    );
  }

  return content;
}
