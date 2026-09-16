/**
 * Centralized image URLs for Dr. Wynette's Foundation.
 * REPLACE_ME: Swap these Unsplash URLs with foundation-owned photography before launch.
 */

export const images = {
  hero: {
    // REPLACE_ME: Primary homepage hero image
    home:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
    about:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80",
    programs:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80",
    impact:
      "https://images.unsplash.com/photo-1497633769973-ee0dc0156930?w=1600&q=80",
    contact:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80",
  },

  programs: {
    // REPLACE_ME: Program-specific hero and gallery images
    menstrualHealth: {
      hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80",
      ],
    },
    mentalHealth: {
      hero: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      ],
    },
    careerDevelopment: {
      hero: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=800&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      ],
    },
  },

  projects: {
    // REPLACE_ME: Project campaign imagery
    thousandGirl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
    padDrive:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    mentorCircle:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80",
    stemWorkshop:
      "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=1200&q=80",
    ruralOutreach:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80",
  },

  team: {
    // REPLACE_ME: Official headshots for founder and team
    founder:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    members: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    ],
  },

  gallery: {
    // REPLACE_ME: Authentic program photography
    communityOutreach:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    schoolVisits:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    workshops:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    events:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    volunteerActivities:
      "https://images.unsplash.com/photo-1559027617-c481c8a0a0a0?w=800&q=80",
  },

  blog: {
    // REPLACE_ME: Blog post featured images
    default:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
  },

  placeholders: {
    partnerLogo: (name: string) =>
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=46A0DC&color=fff&size=128&bold=true`,
  },
} as const;
