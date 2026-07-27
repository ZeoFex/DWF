"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { blogPosts } from "@/content";
import { BlogCard } from "@/components/cards/BlogCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/types";

const categoryLabels: Record<BlogCategory, string> = {
  news: "News",
  programs: "Programs",
  impact: "Impact",
  events: "Events",
  resources: "Resources",
};

type FilterOption = "all" | BlogCategory;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterOption>("all");

  const featured = useMemo(() => {
    const featuredPosts = blogPosts.filter((post) => post.featured);
    return featuredPosts.sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
    )[0];
  }, []);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogPosts
      .filter((post) => post.slug !== featured?.slug)
      .filter((post) => {
        if (category !== "all" && post.category !== category) return false;
        if (!query) return true;
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [category, featured?.slug, search]);

  const categories: FilterOption[] = [
    "all",
    "news",
    "programs",
    "impact",
    "events",
    "resources",
  ];

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {featured && (
          <article className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[20rem]">
                <Image
                  src={featured.imageUrl}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#F0A070] px-3 py-1 text-xs font-semibold text-[#1E1E1E]">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#1E1E1E]/60">
                  <span className="rounded-full bg-[#46A0DC] px-3 py-1 font-semibold text-white">
                    {categoryLabels[featured.category]}
                  </span>
                  <time dateTime={featured.publishedAt}>
                    {formatDate(featured.publishedAt)}
                  </time>
                  <span>By {featured.author}</span>
                </div>
                <h2 className="mt-4 font-serif text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="hover:text-[#46A0DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[#1E1E1E]/75">{featured.excerpt}</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] transition-colors hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
                >
                  Read featured article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        )}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1E1E1E]/40"
              aria-hidden="true"
            />
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or topic…"
              className="w-full rounded-xl border border-[#46A0DC]/20 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
            />
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter articles by category"
          >
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
                  category === value
                    ? "bg-[#46A0DC] text-white"
                    : "bg-[#46A0DC]/10 text-[#46A0DC] hover:bg-[#46A0DC]/20"
                )}
              >
                {value === "all" ? "All" : categoryLabels[value]}
              </button>
            ))}
          </div>
        </div>

        <SectionHeading
          title="Latest Articles"
          description="Stories, updates, and insights from Dr. Winnie's Foundation programs and community."
          className="mt-12"
        />

        {filteredPosts.length === 0 ? (
          <EmptyState
            title="No articles found"
            description="Try adjusting your search or selecting a different category."
            className="mt-8"
          />
        ) : (
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
