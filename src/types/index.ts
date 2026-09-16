/** Shared TypeScript types for Dr. Wynette's Foundation website content. */

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    region: string;
    country: string;
  };
  hours: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
    note?: string;
  };
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: ContactInfo;
  social: SocialLink[];
  announcementBar: {
    text: string;
    href?: string;
    dismissible: boolean;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  note?: string;
  /** Marks illustrative/placeholder data — not verified facts. */
  isIllustrative: true;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
  programSlug?: ProgramSlug;
  imageUrl?: string;
  /** Marks illustrative/placeholder content. */
  isIllustrative: true;
}

export interface ProgramResource {
  title: string;
  description: string;
  href: string;
  type: "article" | "guide" | "video" | "infographic" | "pdf" | "faq" | "external";
}

export interface ProgramStat {
  label: string;
  value: string;
  isIllustrative: true;
}

export type ProgramSlug =
  | "menstrual-health"
  | "mental-health"
  | "career-development";

export interface Program {
  slug: ProgramSlug;
  title: string;
  shortDescription: string;
  intro: string;
  problem: string;
  activities: string[];
  beneficiaries: string;
  approach: string;
  stats: ProgramStat[];
  relatedProjectSlugs: string[];
  galleryImageUrls: string[];
  resources: ProgramResource[];
  testimonials: Testimonial[];
  heroImageUrl: string;
  icon: "heart" | "brain" | "briefcase";
  /** Marks illustrative/placeholder content. */
  isIllustrative: true;
}

export type ProjectStatus = "active" | "upcoming" | "completed";

export interface ProjectUpdate {
  date: string;
  title: string;
  summary: string;
}

export interface ProjectSponsor {
  name: string;
  logoUrl: string;
  /** Marks placeholder partner/sponsor data. */
  isPlaceholder: true;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
  featured: boolean;
  goal?: number;
  raised?: number;
  currency: string;
  girlsSupported?: number;
  timeline: {
    start: string;
    end?: string;
    milestones: { date: string; label: string }[];
  };
  location: string;
  activities: string[];
  impact: string[];
  sponsors: ProjectSponsor[];
  updates: ProjectUpdate[];
  galleryImageUrls: string[];
  heroImageUrl: string;
  /** Marks illustrative/placeholder content. */
  isIllustrative: true;
}

export interface ProgramBreakdown {
  programSlug: ProgramSlug;
  programTitle: string;
  percentage: number;
  description: string;
  isIllustrative: true;
}

export interface LocationImpact {
  name: string;
  region: string;
  girlsReached: number;
  schoolsPartnered: number;
  isIllustrative: true;
}

export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  programSlug?: ProgramSlug;
  imageUrl: string;
  isIllustrative: true;
}

export interface BeforeAfterStory {
  id: string;
  title: string;
  before: string;
  after: string;
  programSlug?: ProgramSlug;
  isIllustrative: true;
}

export interface AnnualReport {
  year: number;
  title: string;
  summary: string;
  downloadUrl: string;
  isIllustrative: true;
}

export interface DonationUsage {
  category: string;
  percentage: number;
  description: string;
  isIllustrative: true;
}

export interface ImpactData {
  statistics: StatItem[];
  programBreakdown: ProgramBreakdown[];
  locations: LocationImpact[];
  successStories: SuccessStory[];
  beforeAfterStories: BeforeAfterStory[];
  annualReports: AnnualReport[];
  donationUsage: DonationUsage[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email?: string;
  linkedin?: string;
  isFounder?: boolean;
  /** Marks illustrative/placeholder bio details. */
  isIllustrative: true;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  description: string;
  /** Marks placeholder partner — not an actual affiliation. */
  isPlaceholder: true;
}

export type EventCategory =
  | "workshop"
  | "outreach"
  | "fundraiser"
  | "training"
  | "community";

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationRequired: boolean;
  registrationUrl?: string;
  imageUrl: string;
  galleryImageUrls?: string[];
  isPast: boolean;
  /** Marks illustrative/placeholder event data. */
  isIllustrative: true;
}

export type ResourceType =
  | "article"
  | "infographic"
  | "pdf"
  | "video"
  | "faq";

export type ResourceTopic =
  | "menstrual-health"
  | "mental-health"
  | "career-development"
  | "general";

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  topic: ResourceTopic;
  href: string;
  imageUrl?: string;
  publishedAt: string;
  /** Marks illustrative/placeholder resource. */
  isIllustrative: true;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  images: GalleryImage[];
}

export type BlogCategory =
  | "news"
  | "programs"
  | "impact"
  | "events"
  | "resources";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: BlogCategory;
  publishedAt: string;
  author: string;
  imageUrl: string;
  featured: boolean;
  /** Marks illustrative/placeholder blog content. */
  isIllustrative: true;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: "compassion" | "empowerment" | "integrity" | "community" | "education";
}

export interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
  isIllustrative: true;
}

export interface ValuesData {
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  aboutStory: string[];
  timeline: TimelineMilestone[];
  /** Marks illustrative/placeholder organizational narrative. */
  isIllustrative: true;
}

export type PaymentStatus = "pending" | "mock_success" | "mock_failed";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  message: string;
}

export interface DonationRequest {
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  projectSlug?: string;
  message?: string;
}
