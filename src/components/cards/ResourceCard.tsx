import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resource, ResourceType } from "@/types";

const typeConfig: Record<
  ResourceType,
  { label: string; icon: typeof FileText }
> = {
  article: { label: "Article", icon: BookOpen },
  infographic: { label: "Infographic", icon: ImageIcon },
  pdf: { label: "PDF", icon: FileText },
  video: { label: "Video", icon: Video },
  faq: { label: "FAQ", icon: HelpCircle },
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const config = typeConfig[resource.type];
  const Icon = config.icon;
  const isExternal = resource.href.startsWith("http");

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {resource.imageUrl ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={resource.imageUrl}
            alt=""
            fill
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-[#46A0DC]/5">
          <Icon className="h-12 w-12 text-[#46A0DC]/40" aria-hidden="true" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#782882]/10 px-3 py-1 text-xs font-semibold text-[#782882]">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {config.label}
        </span>

        <h3 className="mt-3 font-serif text-lg font-semibold text-[#1E1E1E]">
          {resource.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1E1E1E]/70 line-clamp-3">
          {resource.description}
        </p>

        <Link
          href={resource.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] transition-colors hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
        >
          {resource.type === "pdf" ? "Download" : "View resource"}
          {isExternal ? (
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
        </Link>
      </div>
    </article>
  );
}
