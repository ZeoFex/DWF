import type { Testimonial } from "@/types";

/** Testimonials — illustrative placeholder quotes, not verified statements. */
export const testimonials: Testimonial[] = [
  {
    id: "t-student-1",
    quote:
      "The dignity kits changed everything for me. I don't worry about missing school anymore, and the peer club helped me make friends who understand.",
    author: "Ama Serwaa",
    role: "Student",
    organization: "Partner School, East Legon",
    programSlug: "menstrual-health",
    imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-student-2",
    quote:
      "My mentor showed me that engineering isn't just for boys. I'm applying to university programs I never considered before.",
    author: "Efua Mensah",
    role: "Student",
    organization: "Senior High School, Tema",
    programSlug: "career-development",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-teacher-1",
    quote:
      "Dr. Wynette's Foundation didn't just drop off supplies — they trained our teachers and worked with our parents. The change in our school culture is visible.",
    author: "Mr. Kofi Darko",
    role: "Teacher",
    organization: "Community Junior High School",
    programSlug: "menstrual-health",
    isIllustrative: true,
  },
  {
    id: "t-teacher-2",
    quote:
      "The wellness circle training gave me tools to support students beyond academics. I refer girls confidently now because I know professional help is available.",
    author: "Mrs. Abena Ofori",
    role: "Guidance Counselor",
    organization: "Public Senior High School, Accra",
    programSlug: "mental-health",
    isIllustrative: true,
  },
  {
    id: "t-parent-1",
    quote:
      "I used to think talking about periods was shameful. The parent workshop opened my eyes. Now I buy supplies for my daughter without embarrassment.",
    author: "Mr. Yaw Boateng",
    role: "Parent",
    organization: "Madina Community",
    programSlug: "menstrual-health",
    isIllustrative: true,
  },
  {
    id: "t-volunteer-1",
    quote:
      "Volunteering as a mentor has been the most rewarding experience of my career. Watching my mentee grow in confidence over six months reminded me why representation matters.",
    author: "Adelaide Nyarko",
    role: "Volunteer Mentor",
    organization: "Marketing Professional",
    programSlug: "career-development",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-volunteer-2",
    quote:
      "Sorting dignity kits on Saturday mornings with other volunteers — it's simple work that makes a real difference. The foundation makes volunteering feel meaningful, not token.",
    author: "Daniel Kwarteng",
    role: "Volunteer",
    isIllustrative: true,
  },
  {
    id: "t-partner-1",
    quote:
      "Partnering with Dr. Wynette's Foundation aligned perfectly with our corporate social responsibility goals. Their professionalism and measurable impact made collaboration easy.",
    author: "Placeholder Corporate Partner Representative",
    role: "CSR Manager",
    organization: "Placeholder Corporate Partner A",
    isIllustrative: true,
  },
  {
    id: "t-partner-2",
    quote:
      "As a community foundation, we look for partners who center dignity. Dr. Wynette's Foundation does exactly that — we are proud to support their work. (Illustrative statement.)",
    author: "Placeholder Foundation Director",
    role: "Executive Director",
    organization: "Placeholder Community Foundation B",
    isIllustrative: true,
  },
];

/** Filter testimonials by program slug. */
export function getTestimonialsByProgram(
  programSlug: Testimonial["programSlug"]
): Testimonial[] {
  return testimonials.filter(
    (testimonial) => testimonial.programSlug === programSlug
  );
}

/** Retrieve a random subset of testimonials for display. */
export function getFeaturedTestimonials(count: number): Testimonial[] {
  return testimonials.slice(0, count);
}
