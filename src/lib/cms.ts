import { prisma } from "@/lib/db";
import { PublishStatus } from "@/generated/prisma";

const published = PublishStatus.PUBLISHED;

export async function getSiteSettings() {
  try {
    return await prisma.siteSettings.findUnique({ where: { id: "default" } });
  } catch {
    return null;
  }
}

export async function getPublishedBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { status: published },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, status: published },
    });
  } catch {
    return null;
  }
}

export async function getPublishedPrograms() {
  try {
    return await prisma.program.findMany({
      where: { status: published },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    return await prisma.program.findFirst({
      where: { slug, status: published },
    });
  } catch {
    return null;
  }
}

export async function getPublishedProjects() {
  try {
    return await prisma.project.findMany({
      where: { publishStatus: published },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findFirst({
      where: { slug, publishStatus: published },
    });
  } catch {
    return null;
  }
}

export async function getPublishedEvents(includePast = true) {
  try {
    return await prisma.event.findMany({
      where: {
        status: published,
        ...(includePast ? {} : { isPast: false }),
      },
      orderBy: { startsAt: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  try {
    return await prisma.event.findFirst({
      where: { slug, status: published },
    });
  } catch {
    return null;
  }
}

export async function getPublishedResources() {
  try {
    return await prisma.resource.findMany({
      where: { status: published },
      orderBy: [{ category: "asc" }, { title: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getResourceBySlug(slug: string) {
  try {
    return await prisma.resource.findFirst({
      where: { slug, status: published },
    });
  } catch {
    return null;
  }
}

export async function getPublishedGalleryAlbums() {
  try {
    return await prisma.galleryAlbum.findMany({
      where: { status: published },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      include: {
        items: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch {
    return [];
  }
}

export async function getGalleryAlbumBySlug(slug: string) {
  try {
    return await prisma.galleryAlbum.findFirst({
      where: { slug, status: published },
      include: {
        items: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function getPublishedTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      where: { status: published },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublishedTestimonials(featuredOnly = false) {
  try {
    return await prisma.testimonial.findMany({
      where: {
        status: published,
        ...(featuredOnly ? { featured: true } : {}),
      },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublishedPartners(featuredOnly = false) {
  try {
    return await prisma.partner.findMany({
      where: {
        status: published,
        ...(featuredOnly ? { featured: true } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getImpactStats() {
  try {
    return await prisma.impactStat.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getPublishedSuccessStories(featuredOnly = false) {
  try {
    return await prisma.successStory.findMany({
      where: {
        status: published,
        ...(featuredOnly ? { featured: true } : {}),
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getFeaturedBlogPosts(limit = 3) {
  try {
    return await prisma.blogPost.findMany({
      where: { status: published, featured: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(limit = 3) {
  try {
    return await prisma.project.findMany({
      where: { publishStatus: published, featured: true },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getUpcomingEvents(limit = 5) {
  try {
    return await prisma.event.findMany({
      where: { status: published, isPast: false },
      orderBy: { startsAt: "asc" },
      take: limit,
    });
  } catch {
    return [];
  }
}
