import Image from "next/image";
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
  priority = false,
}: BrandLogoProps) {
  const src =
    variant === "dark" ? "/brand/logo-on-dark.png" : "/brand/logo.png";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${siteConfig.name} — Home`}
    >
      <Image
        src={src}
        alt={siteConfig.name}
        width={220}
        height={60}
        priority={priority}
        className="h-10 w-auto max-w-[200px] object-contain object-left sm:h-11 sm:max-w-[240px] lg:h-12"
      />
    </Link>
  );
}
