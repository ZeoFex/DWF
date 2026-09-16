import { images } from "@/content/images";
import type { TeamMember } from "@/types";

/**
 * Team member profiles — illustrative public-facing bios.
 * Sensitive private details are not included. Replace with verified information before launch.
 */
export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Dr. Wynette Mensah",
    role: "Founder & Executive Director",
    bio:
      "Dr. Wynette Mensah founded Dr. Wynette's Foundation with a vision rooted in her professional experience in health education and community service. Having witnessed firsthand how menstrual stigma and limited mentorship opportunities affect girls' education in Ghana, she established the foundation to create practical, dignity-centered programs that address health, wellness, and career pathways together. Dr. Mensah holds advanced qualifications in health sciences and has spent over a decade working with schools, community organizations, and youth groups across Greater Accra. She believes that investing in a girl's confidence and wellbeing today builds the leaders Ghana needs tomorrow. Under her leadership, the foundation has grown from a grassroots initiative into a multi-program organization partnering with schools and volunteers across the region. (Illustrative public-facing bio — details to be verified and updated by the foundation.)",
    imageUrl: images.team.founder,
    email: "wynette.mensah@drwynettesfoundation.org",
    linkedin: "https://linkedin.com/in/wynette-mensah",
    isFounder: true,
    isIllustrative: true,
  },
  {
    id: "programs-director",
    name: "Grace Adomako",
    role: "Director of Programs",
    bio:
      "Grace oversees the design and delivery of all foundation programs, ensuring each initiative meets quality standards and community needs. With a background in social work and youth development, she coordinates school partnerships, volunteer training, and program evaluation. Grace is passionate about creating safe, inclusive spaces where girls feel seen and supported. (Illustrative bio.)",
    imageUrl: images.team.members[0],
    email: "grace.adomako@drwynettesfoundation.org",
    isIllustrative: true,
  },
  {
    id: "operations-manager",
    name: "Samuel Osei",
    role: "Operations Manager",
    bio:
      "Samuel manages day-to-day foundation operations including logistics, supply chain for dignity kits, event coordination, and volunteer scheduling. His organizational skills keep outreach teams equipped and on schedule across multiple communities. (Illustrative bio.)",
    imageUrl: images.team.members[1],
    email: "samuel.osei@drwynettesfoundation.org",
    isIllustrative: true,
  },
  {
    id: "communications-lead",
    name: "Akosua Frimpong",
    role: "Communications & Outreach Lead",
    bio:
      "Akosua leads the foundation's storytelling, social media, and community engagement efforts. She works with program teams to share impact stories responsibly and coordinates media partnerships that amplify the foundation's mission. (Illustrative bio.)",
    imageUrl: images.team.members[2],
    email: "akosua.frimpong@drwynettesfoundation.org",
    isIllustrative: true,
  },
  {
    id: "mental-health-coordinator",
    name: "Dr. Esi Hammond",
    role: "Mental Health Program Coordinator",
    bio:
      "Dr. Hammond is a licensed counselor who designs and supervises the foundation's wellness circles and counseling referral network. She trains volunteer facilitators in trauma-informed practices and ensures all mental health programming meets professional ethical standards. (Illustrative bio.)",
    imageUrl: images.team.members[3],
    email: "esi.hammond@drwynettesfoundation.org",
    isIllustrative: true,
  },
  {
    id: "volunteer-coordinator",
    name: "Kwame Ansah",
    role: "Volunteer Coordinator",
    bio:
      "Kwame recruits, trains, and supports the foundation's volunteer community — from workshop facilitators to mentor matches. He maintains the volunteer database and ensures every volunteer receives orientation and ongoing support. (Illustrative bio.)",
    imageUrl: images.team.members[4],
    email: "kwame.ansah@drwynettesfoundation.org",
    isIllustrative: true,
  },
];

/** Retrieve the founder team member. */
export function getFounder(): TeamMember | undefined {
  return teamMembers.find((member) => member.isFounder);
}

/** Retrieve non-founder team members. */
export function getTeamMembers(): TeamMember[] {
  return teamMembers.filter((member) => !member.isFounder);
}
