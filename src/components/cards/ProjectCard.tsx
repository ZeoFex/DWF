import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CampaignProgress } from "@/components/ui/CampaignProgress";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

const statusStyles: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-[#782882]/15 text-[#782882]",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-[#F0A070]/20 text-[#8a6d1a]",
  },
  completed: {
    label: "Completed",
    className: "bg-[#46A0DC]/15 text-[#46A0DC]",
  },
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status = statusStyles[project.status];
  const isFundraising =
    project.status === "active" &&
    project.goal != null &&
    project.raised != null;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.heroImageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1E1E1E]/70">
          {project.shortDescription}
        </p>

        {isFundraising && (
          <div className="mt-4">
            <CampaignProgress
              goal={project.goal!}
              raised={project.raised!}
              currency={project.currency}
              showAmounts={false}
            />
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] transition-colors hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
        >
          View project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
