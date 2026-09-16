import Link from "next/link";
import { siteConfig } from "@/content";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Use white-text logo for dark backgrounds */
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  variant = "light",
  className,
}: BrandLogoProps) {
  const src =
    variant === "dark" ? "/brand/logo-on-dark.svg" : "/brand/logo.svg";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${siteConfig.name} — Home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={siteConfig.name}
        width={240}
        height={64}
        className="h-10 w-auto max-w-[210px] object-contain object-left sm:h-11 sm:max-w-[250px] lg:h-12"
      />
    </Link>
  );
}
