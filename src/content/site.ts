import type { SiteConfig } from "@/types";

/** Site-wide configuration for Dr. Wynette's Foundation. */
export const siteConfig: SiteConfig = {
  name: "Dr. Wynette's Foundation",
  shortName: "DWF",
  tagline: "Empowering girls through health, wellness, and opportunity",
  description:
    "Dr. Wynette's Foundation supports young women and girls in Ghana through menstrual health education, mental wellness programs, and career development initiatives — building confident, capable leaders in their communities.",
  contact: {
    email: "info@drwynettesfoundation.org",
    phone: "+233 24 XXX XXXX",
    whatsapp: "+233 24 XXX XXXX",
    whatsappLink: "https://wa.me/23324XXXXXXX",
    address: {
      line1: "East Legon, Plot 12, Nii Okwei Kinka Street",
      line2: "Near American House",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
    },
    hours: {
      weekdays: "Monday – Friday: 9:00 AM – 5:00 PM",
      saturday: "Saturday: 10:00 AM – 2:00 PM (by appointment)",
      sunday: "Sunday: Closed",
      note: "Office visits are by appointment. WhatsApp messages are typically answered within 24 hours on business days.",
    },
  },
  social: [
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://facebook.com/drwynettesfoundation",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://instagram.com/drwynettesfoundation",
    },
    {
      platform: "twitter",
      label: "X (Twitter)",
      href: "https://twitter.com/drwynettesfoundation",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/company/drwynettesfoundation",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://youtube.com/@drwynettesfoundation",
    },
  ],
  announcementBar: {
    text: "Join our 1000 Girl Project — help us reach 1,000 girls with health kits and mentorship this year. Learn more →",
    href: "/projects/1000-girl-project",
    dismissible: true,
  },
};
