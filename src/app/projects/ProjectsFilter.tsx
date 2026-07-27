"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

type FilterStatus = "all" | ProjectStatus;

interface ProjectsFilterProps {
  projects: Project[];
  className?: string;
}

const filters: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

export function ProjectsFilter({ projects, className }: ProjectsFilterProps) {
  const [status, setStatus] = useState<FilterStatus>("all");

  const filtered = useMemo(
    () =>
      status === "all"
        ? projects
        : projects.filter((project) => project.status === status),
    [projects, status]
  );

  return (
    <div className={cn("space-y-8", className)}>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by status"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatus(filter.value)}
            aria-pressed={status === filter.value}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
              status === filter.value
                ? "bg-[#46A0DC] text-white"
                : "bg-[#46A0DC]/10 text-[#46A0DC] hover:bg-[#46A0DC]/20"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-[#1E1E1E]/60">
          No projects found for this filter.
        </p>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
