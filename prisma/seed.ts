import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, PublishStatus, ProjectStatus } from "../src/generated/prisma";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {
  arrayMode: false,
  fullResults: true,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL || "admin@drwynettesfoundation.org";
  const password = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";
  const name = process.env.ADMIN_SEED_NAME || "Site Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
    create: {
      email,
      name,
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Dr. Wynette's Foundation",
      tagline: "Empowering girls through health, wellness, and opportunity",
      description:
        "Dr. Wynette's Foundation supports young women and girls in Ghana through menstrual health education, mental wellness programs, and career development initiatives.",
      email: "info@drwynettesfoundation.org",
      phone: "+233 24 XXX XXXX",
      whatsapp: "+233 24 XXX XXXX",
      whatsappLink: "https://wa.me/23324XXXXXXX",
      addressLine1: "East Legon, Plot 12, Nii Okwei Kinka Street",
      addressLine2: "Near American House",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      hoursWeekdays: "Monday – Friday: 9:00 AM – 5:00 PM",
      hoursSaturday: "Saturday: 10:00 AM – 2:00 PM (by appointment)",
      hoursSunday: "Sunday: Closed",
      hoursNote:
        "Office visits are by appointment. WhatsApp messages are typically answered within 24 hours on business days.",
      announcementText:
        "Join our 1000 Girl Project — help us reach 1,000 girls with health kits and mentorship this year. Learn more →",
      announcementHref: "/projects/1000-girl-project",
      announcementActive: true,
      socialLinks: [
        { platform: "facebook", label: "Facebook", href: "https://facebook.com/drwynettesfoundation" },
        { platform: "instagram", label: "Instagram", href: "https://instagram.com/drwynettesfoundation" },
        { platform: "twitter", label: "X (Twitter)", href: "https://twitter.com/drwynettesfoundation" },
        { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/drwynettesfoundation" },
        { platform: "youtube", label: "YouTube", href: "https://youtube.com/@drwynettesfoundation" },
      ],
      heroHeadline:
        "Empowering Communities Through Health Education, Menstrual Dignity and Youth Development.",
      heroSupporting:
        "Dr. Wynette's Foundation is committed to improving lives through menstrual health education, mental health awareness, career development, and community outreach.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
      aboutPreview:
        "We exist to ensure every girl can learn, lead, and thrive — with dignity, mental wellness support, and clear pathways to opportunity.",
      aboutImageUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80",
    },
  });

  const programs = [
    {
      slug: "menstrual-health",
      title: "Menstrual Health & Dignity",
      shortDescription:
        "Breaking stigma and ensuring every girl has access to education, supplies, and safe spaces to manage menstruation with confidence.",
      intro:
        "Our Menstrual Health & Dignity program equips girls with knowledge, supplies, and school-based support systems so periods never become a barrier to learning.",
      problem:
        "Many girls miss school during menstruation due to lack of supplies, inadequate facilities, and stigma.",
      activities: [
        "School-based menstrual health workshops",
        "Dignity kit distribution",
        "Teacher training",
        "Community dialogues",
      ],
      beneficiaries: "Girls aged 10–18 in partner schools across Greater Accra and Eastern Region.",
      approach: "Education, supply provision, and sustained community engagement centered on dignity.",
      stats: [
        { label: "Girls reached", value: "2,400+" },
        { label: "Schools partnered", value: "18" },
      ],
      heroImageUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
      galleryUrls: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      ],
      icon: "heart",
      sortOrder: 1,
    },
    {
      slug: "mental-health",
      title: "Mental Health & Wellness",
      shortDescription:
        "Safe spaces, peer support, and practical tools that help young people care for their emotional wellbeing.",
      intro:
        "We normalize conversations about mental health and connect youth to supportive adults and peer networks.",
      problem:
        "Young people often lack trusted spaces to discuss stress, anxiety, and emotional challenges.",
      activities: [
        "Wellness circles",
        "Counseling referrals",
        "Educator training",
        "Stress management workshops",
      ],
      beneficiaries: "Students, teachers, and caregivers in partner communities.",
      approach: "Peer-led wellness, adult capacity building, and referral pathways.",
      stats: [
        { label: "Wellness sessions", value: "180+" },
        { label: "Youth participants", value: "1,100+" },
      ],
      heroImageUrl:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      galleryUrls: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      ],
      icon: "brain",
      sortOrder: 2,
    },
    {
      slug: "career-development",
      title: "Career Development & Leadership",
      shortDescription:
        "Mentorship, skills workshops, and leadership pathways that help girls imagine and pursue meaningful careers.",
      intro:
        "We connect girls with mentors, skills training, and exposure to careers in STEM, entrepreneurship, and public service.",
      problem:
        "Limited mentorship and career guidance leave many girls without clear pathways after school.",
      activities: [
        "Mentor matching",
        "Skills workshops",
        "STEM exposure days",
        "Leadership clubs",
      ],
      beneficiaries: "Secondary school girls and young women seeking career guidance.",
      approach: "Mentorship plus practical skills and community celebration of girl leaders.",
      stats: [
        { label: "Mentorship pairs", value: "210+" },
        { label: "Workshops delivered", value: "64" },
      ],
      heroImageUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
      galleryUrls: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      ],
      icon: "briefcase",
      sortOrder: 3,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: { ...program, status: PublishStatus.PUBLISHED },
      create: { ...program, status: PublishStatus.PUBLISHED },
    });
  }

  await prisma.project.upsert({
    where: { slug: "1000-girl-project" },
    update: {},
    create: {
      slug: "1000-girl-project",
      title: "1000 Girl Project",
      shortDescription:
        "Flagship campaign to reach 1,000 girls with health kits, mentorship, and school support.",
      status: ProjectStatus.ACTIVE,
      featured: true,
      goal: 150000,
      raised: 87450,
      currency: "GHS",
      girlsSupported: 642,
      timelineStart: new Date("2025-01-15"),
      timelineEnd: new Date("2026-12-31"),
      milestones: [
        { date: "2025-03-01", label: "Campaign launch" },
        { date: "2026-12-31", label: "Goal: 1,000 girls supported" },
      ],
      location: "Greater Accra & Eastern Region, Ghana",
      activities: [
        "Dignity kit distribution",
        "Mentorship sessions",
        "School wellness workshops",
      ],
      impact: [
        "642 girls enrolled (illustrative)",
        "12 partner schools engaged (illustrative)",
      ],
      sponsors: [],
      updates: [
        {
          date: "2025-11-20",
          title: "642 Girls and Counting",
          summary: "Mid-campaign milestone update.",
        },
      ],
      galleryUrls: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      ],
      heroImageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
      publishStatus: PublishStatus.PUBLISHED,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "1000-girl-project-milestone-642" },
    update: {},
    create: {
      slug: "1000-girl-project-milestone-642",
      title: "642 Girls and Counting: 1000 Girl Project Mid-Campaign Update",
      excerpt:
        "Our flagship campaign has reached 642 girls across 12 partner schools.",
      content:
        "When we launched the 1000 Girl Project, we set an ambitious goal to reach 1,000 girls with health kits, mentorship, and school support.\n\nToday we celebrate 642 girls enrolled — an illustrative milestone reflecting the dedication of our team, volunteers, and donors.\n\n(Illustrative content for CMS seeding.)",
      category: "programs",
      author: "Akosua Frimpong",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
      featured: true,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date("2025-11-20"),
      authorId: admin.id,
    },
  });

  const stats = [
    { label: "Girls reached since founding", value: 4200, suffix: "+", sortOrder: 1 },
    { label: "Partner schools", value: 32, suffix: "", sortOrder: 2 },
    { label: "Dignity kits distributed", value: 6800, suffix: "+", sortOrder: 3 },
    { label: "Volunteer hours contributed", value: 12400, suffix: "+", sortOrder: 4 },
    { label: "Mentorship pairs formed", value: 210, suffix: "+", sortOrder: 5 },
    { label: "Communities served", value: 18, suffix: "", sortOrder: 6 },
  ];

  const existingStats = await prisma.impactStat.count();
  if (existingStats === 0) {
    await prisma.impactStat.createMany({ data: stats });
  }

  await prisma.teamMember.upsert({
    where: { id: "seed-founder" },
    update: {},
    create: {
      id: "seed-founder",
      name: "Dr. Wynette Mensah",
      role: "Founder & Executive Director",
      bio: "Dr. Wynette Mensah founded Dr. Wynette's Foundation to create dignity-centered programs addressing health, wellness, and career pathways for girls in Ghana. (Illustrative public-facing bio.)",
      imageUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
      isFounder: true,
      sortOrder: 0,
      status: PublishStatus.PUBLISHED,
    },
  });

  console.log("Seed complete.");
  console.log(`Admin login: ${email}`);
  console.log(`Admin password: ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
