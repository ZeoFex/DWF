import type { NavItem } from "@/types";

/** Primary site navigation matching application routes. */
export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Our Story",
        href: "/about",
      },
      {
        label: "Our Team",
        href: "/about#team",
      },
    ],
  },
  {
    label: "Our Programs",
    href: "/programs",
    children: [
      {
        label: "Menstrual Health",
        href: "/programs/menstrual-health",
      },
      {
        label: "Mental Health & Wellness",
        href: "/programs/mental-health",
      },
      {
        label: "Career Development",
        href: "/programs/career-development",
      },
    ],
  },
  {
    label: "Projects & Campaigns",
    href: "/projects",
  },
  {
    label: "Impact",
    href: "/impact",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      {
        label: "Volunteer",
        href: "/volunteer",
      },
      {
        label: "Partner With Us",
        href: "/partner",
      },
      {
        label: "Donate",
        href: "/donate",
      },
    ],
  },
  {
    label: "Blog / News",
    href: "/blog",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];
