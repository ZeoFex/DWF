import { z } from "zod";
import {
  AdminRole,
  DonationType,
  InquiryStatus,
  MediaType,
  PaymentStatus,
  ProjectStatus,
  PublishStatus,
} from "@/generated/prisma";

export const blogCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  featured: z.boolean().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const blogUpdateSchema = blogCreateSchema.partial();

export const programCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  intro: z.string().min(1),
  problem: z.string().min(1),
  activities: z.array(z.string()).default([]),
  beneficiaries: z.string().min(1),
  approach: z.string().min(1),
  stats: z.record(z.string(), z.unknown()).default({}),
  heroImageUrl: z.string().url().optional().nullable(),
  galleryUrls: z.array(z.string()).optional(),
  icon: z.string().min(1),
  status: z.nativeEnum(PublishStatus).optional(),
  sortOrder: z.number().int().optional(),
});

export const programUpdateSchema = programCreateSchema.partial();

export const projectCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  status: z.nativeEnum(ProjectStatus).optional(),
  featured: z.boolean().optional(),
  goal: z.number().optional().nullable(),
  raised: z.number().optional().nullable(),
  currency: z.string().length(3).optional(),
  girlsSupported: z.number().int().optional().nullable(),
  timelineStart: z.string().datetime().optional().nullable(),
  timelineEnd: z.string().datetime().optional().nullable(),
  milestones: z.unknown().optional().nullable(),
  location: z.string().optional().nullable(),
  activities: z.array(z.string()).optional(),
  impact: z.array(z.string()).optional(),
  sponsors: z.unknown().optional().nullable(),
  updates: z.unknown().optional().nullable(),
  galleryUrls: z.array(z.string()).optional(),
  heroImageUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  publishStatus: z.nativeEnum(PublishStatus).optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial();

export const eventCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional().nullable(),
  location: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  registrationRequired: z.boolean().optional(),
  isPast: z.boolean().optional(),
  galleryUrls: z.array(z.string()).optional(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export const resourceCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  format: z.string().min(1),
  topic: z.string().optional().nullable(),
  fileUrl: z.string().url().optional().nullable(),
  externalUrl: z.string().url().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export const resourceUpdateSchema = resourceCreateSchema.partial();

export const galleryAlbumCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  coverUrl: z.string().url().optional().nullable(),
  status: z.nativeEnum(PublishStatus).optional(),
  sortOrder: z.number().int().optional(),
});

export const galleryAlbumUpdateSchema = galleryAlbumCreateSchema.partial();

export const galleryItemCreateSchema = z.object({
  url: z.string().url(),
  mediaType: z.nativeEnum(MediaType).optional(),
  alt: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export const teamCreateSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  email: z.string().email().optional().nullable(),
  isFounder: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export const teamUpdateSchema = teamCreateSchema.partial();

export const testimonialCreateSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  programSlug: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
  sortOrder: z.number().int().optional(),
});

export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export const partnerCreateSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().url().optional().nullable(),
  websiteUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export const partnerUpdateSchema = partnerCreateSchema.partial();

export const impactStatCreateSchema = z.object({
  label: z.string().min(1),
  value: z.number(),
  suffix: z.string().optional().nullable(),
  prefix: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export const impactStatUpdateSchema = impactStatCreateSchema.partial();

export const successStoryCreateSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  quote: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  href: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export const successStoryUpdateSchema = successStoryCreateSchema.partial();

export const messageStatusSchema = z.object({
  status: z.nativeEnum(InquiryStatus),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  whatsappLink: z.string().url(),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(1),
  region: z.string().min(1),
  country: z.string().min(1),
  hoursWeekdays: z.string().min(1),
  hoursSaturday: z.string().optional().nullable(),
  hoursSunday: z.string().optional().nullable(),
  hoursNote: z.string().optional().nullable(),
  announcementText: z.string().optional().nullable(),
  announcementHref: z.string().optional().nullable(),
  announcementActive: z.boolean().optional(),
  socialLinks: z.array(z.unknown()).or(z.record(z.string(), z.unknown())),
  heroHeadline: z.string().optional().nullable(),
  heroSupporting: z.string().optional().nullable(),
  heroImageUrl: z.string().url().optional().nullable(),
  aboutPreview: z.string().optional().nullable(),
  aboutImageUrl: z.string().url().optional().nullable(),
});

export const adminRoleSchema = z.nativeEnum(AdminRole);
export const donationTypeSchema = z.nativeEnum(DonationType);
export const paymentStatusSchema = z.nativeEnum(PaymentStatus);
