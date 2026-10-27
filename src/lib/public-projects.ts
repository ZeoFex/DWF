import type { Project as DbProject } from "@/generated/prisma";
import type { Project, ProjectSponsor, ProjectStatus, ProjectUpdate } from "@/types";
import { images } from "@/content/images";
import {
  getFeaturedProject as getStaticFeaturedProject,
  getProjectBySlug as getStaticProjectBySlug,
  projects as staticProjects,
} from "@/content/projects";
import {
  getProjectBySlug as getDbProjectBySlug,
  getPublishedProjects,
} from "@/lib/cms";

function mapStatus(status: DbProject["status"]): ProjectStatus {
  switch (status) {
    case "ACTIVE":
      return "active";
    case "UPCOMING":
      return "upcoming";
    case "COMPLETED":
      return "completed";
    default:
      return "active";
  }
}

function asMilestones(value: unknown): { date: string; label: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      if (typeof row.date !== "string" || typeof row.label !== "string") return null;
      return { date: row.date, label: row.label };
    })
    .filter((item): item is { date: string; label: string } => item !== null);
}

function asUpdates(value: unknown): ProjectUpdate[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      if (
        typeof row.date !== "string" ||
        typeof row.title !== "string" ||
        typeof row.summary !== "string"
      ) {
        return null;
      }
      return { date: row.date, title: row.title, summary: row.summary };
    })
    .filter((item): item is ProjectUpdate => item !== null);
}

function asSponsors(value: unknown): ProjectSponsor[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      if (typeof row.name !== "string") return null;
      return {
        name: row.name,
        logoUrl:
          typeof row.logoUrl === "string"
            ? row.logoUrl
            : images.placeholders.partnerLogo(row.name),
        isPlaceholder: true as const,
      };
    })
    .filter((item): item is ProjectSponsor => item !== null);
}

export function mapDbProjectToPublic(project: DbProject): Project {
  const fallback = getStaticProjectBySlug(project.slug);
  const start =
    project.timelineStart?.toISOString().slice(0, 10) ??
    fallback?.timeline.start ??
    new Date().toISOString().slice(0, 10);
  const end =
    project.timelineEnd?.toISOString().slice(0, 10) ?? fallback?.timeline.end;

  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    status: mapStatus(project.status),
    featured: project.featured,
    goal: project.goal ?? undefined,
    raised: project.raised ?? undefined,
    currency: project.currency || "GHS",
    girlsSupported: project.girlsSupported ?? undefined,
    timeline: {
      start,
      end,
      milestones:
        asMilestones(project.milestones).length > 0
          ? asMilestones(project.milestones)
          : fallback?.timeline.milestones ?? [],
    },
    location: project.location || fallback?.location || "",
    activities:
      project.activities.length > 0
        ? project.activities
        : fallback?.activities ?? [],
    impact:
      project.impact.length > 0 ? project.impact : fallback?.impact ?? [],
    sponsors:
      asSponsors(project.sponsors).length > 0
        ? asSponsors(project.sponsors)
        : fallback?.sponsors ?? [],
    updates:
      asUpdates(project.updates).length > 0
        ? asUpdates(project.updates)
        : fallback?.updates ?? [],
    galleryImageUrls:
      project.galleryUrls.length > 0
        ? project.galleryUrls
        : fallback?.galleryImageUrls ?? [],
    heroImageUrl:
      project.heroImageUrl ||
      fallback?.heroImageUrl ||
      images.projects.thousandGirl,
    isIllustrative: true,
  };
}

export async function getPublicProjects(): Promise<Project[]> {
  const dbProjects = await getPublishedProjects();
  if (dbProjects.length === 0) return staticProjects;

  const mapped = dbProjects.map(mapDbProjectToPublic);
  const dbSlugs = new Set(mapped.map((p) => p.slug));
  const extras = staticProjects.filter((p) => !dbSlugs.has(p.slug));
  return [...mapped, ...extras];
}

export async function getPublicProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const dbProject = await getDbProjectBySlug(slug);
  if (dbProject) return mapDbProjectToPublic(dbProject);

  // Also resolve common slug aliases for the flagship campaign
  if (slug === "1000-girl-project" || slug === "the-1000-girl-project") {
    const alias = await getDbProjectBySlug(
      slug === "1000-girl-project"
        ? "the-1000-girl-project"
        : "1000-girl-project"
    );
    if (alias) return mapDbProjectToPublic(alias);
  }

  return getStaticProjectBySlug(slug);
}

export async function getPublicFeaturedProject(): Promise<Project | undefined> {
  const projects = await getPublicProjects();
  return (
    projects.find((p) => p.featured && p.status === "active") ??
    getStaticFeaturedProject()
  );
}
