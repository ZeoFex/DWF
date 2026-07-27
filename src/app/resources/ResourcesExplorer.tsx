"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { cn } from "@/lib/utils";
import type { Resource, ResourceTopic, ResourceType } from "@/types";

type TopicFilter = "all" | ResourceTopic;
type TypeFilter = "all" | ResourceType;

interface ResourcesExplorerProps {
  resources: Resource[];
  className?: string;
}

const topicFilters: { value: TopicFilter; label: string }[] = [
  { value: "all", label: "All Topics" },
  { value: "menstrual-health", label: "Menstrual Health" },
  { value: "mental-health", label: "Mental Health" },
  { value: "career-development", label: "Career Development" },
  { value: "general", label: "General" },
];

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "article", label: "Articles" },
  { value: "pdf", label: "PDFs" },
  { value: "video", label: "Videos" },
  { value: "infographic", label: "Infographics" },
  { value: "faq", label: "FAQs" },
];

export function ResourcesExplorer({
  resources,
  className,
}: ResourcesExplorerProps) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesTopic = topic === "all" || resource.topic === topic;
      const matchesType = type === "all" || resource.type === type;
      const matchesQuery =
        !normalizedQuery ||
        resource.title.toLowerCase().includes(normalizedQuery) ||
        resource.description.toLowerCase().includes(normalizedQuery);

      return matchesTopic && matchesType && matchesQuery;
    });
  }, [resources, query, topic, type]);

  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-4">
        <label htmlFor="resource-search" className="sr-only">
          Search resources
        </label>
        <input
          id="resource-search"
          type="search"
          placeholder="Search resources by title or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-3 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
        />

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {topicFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTopic(filter.value)}
              aria-pressed={topic === filter.value}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
                topic === filter.value
                  ? "bg-[#46A0DC] text-white"
                  : "bg-[#46A0DC]/10 text-[#46A0DC] hover:bg-[#46A0DC]/20"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setType(filter.value)}
              aria-pressed={type === filter.value}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
                type === filter.value
                  ? "bg-[#782882] text-white"
                  : "bg-[#782882]/10 text-[#782882] hover:bg-[#782882]/20"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-[#1E1E1E]/60" aria-live="polite">
        Showing {filtered.length} of {resources.length} resources
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-[#1E1E1E]/60">
          No resources match your search. Try adjusting filters or keywords.
        </p>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <li key={resource.id}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
