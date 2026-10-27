import { images } from "@/content/images";
import type { Project } from "@/types";

/** Project and campaign content — illustrative placeholder data, not verified facts. */
export const projects: Project[] = [
  {
    slug: "1000-girl-project",
    title: "1000 Girl Project",
    shortDescription:
      "The 1000 Girl Project is an initiative by Dr. Wynette's Foundation with a goal of providing 1,000 girls with sanitary pads while equipping young people with essential knowledge and resources to thrive. Through school outreaches, the project focuses on the Foundation's three pillars: menstrual health, mental health, and career development. While sanitary pads are provided specifically for girls, boys are included in the educational sessions to promote understanding, empathy, and inclusion. Participating students also receive educational supplies, including pens, books, tissues, and mathematical sets, supporting their learning and personal development. Ultimately, the project seeks to nurture a generation of informed, confident, and empowered young people.",
    status: "active",
    featured: true,
    goal: 60000,
    raised: 41000,
    currency: "GHS",
    girlsSupported: 315,
    timeline: {
      start: "2025-01-15",
      end: "2026-12-31",
      milestones: [
        { date: "2025-03-01", label: "Campaign launch and first 100 girls enrolled" },
        { date: "2025-06-15", label: "Mid-year review — 350 girls reached" },
        { date: "2025-09-01", label: "Expanded to Eastern Region partner schools" },
        { date: "2026-01-01", label: "Target: 750 girls with full program support" },
        { date: "2026-12-31", label: "Goal: 1,000 girls supported across all three programs" },
      ],
    },
    location: "Greater Accra & Ashanti Region, Ghana",
    activities: [
      "Menstrual Health Education",
      "Career Development",
      "Mental Health Awareness",
    ],
    impact: [
      "315 pupils enrolled (illustrative)",
      "3 partner schools engaged (illustrative)",
    ],
    sponsors: [
      {
        name: "Placeholder Corporate Partner A",
        logoUrl: images.placeholders.partnerLogo("Partner A"),
        isPlaceholder: true,
      },
      {
        name: "Placeholder Community Foundation B",
        logoUrl: images.placeholders.partnerLogo("Foundation B"),
        isPlaceholder: true,
      },
    ],
    updates: [
      {
        date: "2025-11-20",
        title: "642 Girls and Counting",
        summary:
          "We've reached 642 girls across 12 partner schools. Thank you to every donor and volunteer who made this milestone possible. Our next push targets 750 by January.",
      },
      {
        date: "2025-08-10",
        title: "Eastern Region Expansion",
        summary:
          "Three new schools in Koforidua joined the project, bringing menstrual health workshops to 180 additional girls in rural communities.",
      },
      {
        date: "2025-04-05",
        title: "First 200 Girls Enrolled",
        summary:
          "Celebrating our first cohort with a community event in East Legon. Girls received kits, met their mentors, and shared their hopes for the year ahead.",
      },
    ],
    galleryImageUrls: [
      images.projects.thousandGirl,
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    ],
    heroImageUrl: images.projects.thousandGirl,
    isIllustrative: true,
  },
  {
    slug: "pad-drive-accra",
    title: "Accra Pad Drive 2025",
    shortDescription:
      "A community collection drive gathering menstrual supplies for girls in underserved Accra neighborhoods.",
    status: "active",
    featured: false,
    goal: 25000,
    raised: 18200,
    currency: "GHS",
    girlsSupported: 480,
    timeline: {
      start: "2025-06-01",
      end: "2025-12-31",
      milestones: [
        { date: "2025-06-15", label: "Drive launch at community centers" },
        { date: "2025-09-01", label: "Mid-drive distribution to 300 girls" },
        { date: "2025-12-15", label: "Final distribution and impact report" },
      ],
    },
    location: "Accra Metropolitan Area, Ghana",
    activities: [
      "Collection points at churches, schools, and partner businesses",
      "Volunteer sorting and kit assembly days",
      "Direct delivery to 8 partner schools",
      "Social media awareness campaign on menstrual dignity",
    ],
    impact: [
      "480 girls received three-month supply kits (illustrative)",
      "2,400 individual pad packs collected through community donations",
      "35 recurring monthly donors enrolled (illustrative)",
    ],
    sponsors: [
      {
        name: "Placeholder Retail Partner",
        logoUrl: images.placeholders.partnerLogo("Retail Co"),
        isPlaceholder: true,
      },
    ],
    updates: [
      {
        date: "2025-10-01",
        title: "Halfway to Goal",
        summary: "We've raised GHS 18,200 of our GHS 25,000 target. Two more collection weekends scheduled in November.",
      },
    ],
    galleryImageUrls: [
      images.projects.padDrive,
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    ],
    heroImageUrl: images.projects.padDrive,
    isIllustrative: true,
  },
  {
    slug: "mentor-circle-2025",
    title: "Mentor Circle 2025",
    shortDescription:
      "Matching 100 girls with professional women mentors for a year-long journey of guidance, goal-setting, and growth.",
    status: "active",
    featured: false,
    goal: 60000,
    raised: 41500,
    currency: "GHS",
    girlsSupported: 78,
    timeline: {
      start: "2025-02-01",
      end: "2026-01-31",
      milestones: [
        { date: "2025-02-15", label: "Mentor orientation and matching event" },
        { date: "2025-06-01", label: "Mid-program check-in and skills workshop" },
        { date: "2026-01-15", label: "Graduation ceremony and alumni network launch" },
      ],
    },
    location: "Greater Accra, Ghana",
    activities: [
      "Bi-monthly one-on-one mentor-mentee meetings",
      "Quarterly group workshops on leadership and career planning",
      "Mentor training on youth development best practices",
      "End-of-program showcase where mentees present their goals achieved",
    ],
    impact: [
      "78 active mentorship pairs (illustrative, scaling to 100)",
      "92% mentee retention through mid-program (illustrative)",
      "40 volunteer mentors from diverse professional backgrounds",
    ],
    sponsors: [
      {
        name: "Placeholder Professional Network",
        logoUrl: images.placeholders.partnerLogo("Pro Network"),
        isPlaceholder: true,
      },
    ],
    updates: [
      {
        date: "2025-09-20",
        title: "Mid-Program Success Stories",
        summary: "Mentees shared progress on scholarship applications, internship placements, and personal confidence goals at our September showcase.",
      },
    ],
    galleryImageUrls: [
      images.projects.mentorCircle,
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    ],
    heroImageUrl: images.projects.mentorCircle,
    isIllustrative: true,
  },
  {
    slug: "stem-girls-workshop",
    title: "STEM Girls Workshop Series",
    shortDescription:
      "Hands-on science, technology, and engineering workshops designed to spark curiosity and confidence in STEM fields.",
    status: "upcoming",
    featured: false,
    goal: 35000,
    raised: 8200,
    currency: "GHS",
    timeline: {
      start: "2026-03-01",
      end: "2026-08-31",
      milestones: [
        { date: "2026-01-15", label: "Volunteer facilitator recruitment opens" },
        { date: "2026-03-01", label: "First workshop: Introduction to Coding" },
        { date: "2026-05-15", label: "Robotics and engineering module" },
        { date: "2026-08-15", label: "Final showcase and certificate ceremony" },
      ],
    },
    location: "Tema & Accra, Ghana",
    activities: [
      "Six weekend workshops covering coding, robotics, and lab science",
      "Guest speakers from Ghanaian women in STEM careers",
      "Team projects presented at a public science fair",
      "Take-home learning kits for continued exploration",
    ],
    impact: [
      "Target: 60 girls across two cohorts (illustrative projection)",
      "Partnership with local tech hub for lab space (illustrative)",
    ],
    sponsors: [],
    updates: [
      {
        date: "2025-12-01",
        title: "Early Bird Registration Open",
        summary: "Girls aged 14–18 can pre-register for the March 2026 cohort. Early supporters help us secure equipment and materials.",
      },
    ],
    galleryImageUrls: [
      images.projects.stemWorkshop,
      "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=800&q=80",
    ],
    heroImageUrl: images.projects.stemWorkshop,
    isIllustrative: true,
  },
  {
    slug: "rural-outreach-eastern",
    title: "Eastern Region Rural Outreach",
    shortDescription:
      "Bringing menstrual health education and dignity kits to girls in rural Eastern Region communities with limited access to services.",
    status: "completed",
    featured: false,
    goal: 40000,
    raised: 40000,
    currency: "GHS",
    girlsSupported: 520,
    timeline: {
      start: "2024-03-01",
      end: "2024-11-30",
      milestones: [
        { date: "2024-03-15", label: "Community needs assessment completed" },
        { date: "2024-06-01", label: "First outreach to 5 rural schools" },
        { date: "2024-11-15", label: "Final report and handover to local ambassadors" },
      ],
    },
    location: "Eastern Region, Ghana",
    activities: [
      "Mobile outreach teams visiting 10 rural schools",
      "Dignity kit distribution and health education sessions",
      "Training local peer ambassadors for sustainability",
      "Community meetings with traditional leaders and parents",
    ],
    impact: [
      "520 girls reached across 10 schools (illustrative final count)",
      "100% of partner schools received ambassador training (illustrative)",
      "Local sustainability plan adopted by 8 community committees",
    ],
    sponsors: [
      {
        name: "Placeholder NGO Alliance",
        logoUrl: images.placeholders.partnerLogo("NGO Alliance"),
        isPlaceholder: true,
      },
    ],
    updates: [
      {
        date: "2024-12-01",
        title: "Project Complete — Impact Report Published",
        summary: "Our Eastern Region outreach exceeded its enrollment target. Full impact report available for download on our Impact page.",
      },
    ],
    galleryImageUrls: [
      images.projects.ruralOutreach,
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    ],
    heroImageUrl: images.projects.ruralOutreach,
    isIllustrative: true,
  },
];

/** Retrieve a project by its slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Retrieve the featured active project. */
export function getFeaturedProject(): Project | undefined {
  return projects.find((project) => project.featured && project.status === "active");
}

/** Filter projects by status. */
export function getProjectsByStatus(
  status: Project["status"]
): Project[] {
  return projects.filter((project) => project.status === status);
}
