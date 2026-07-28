import { PageHeader } from "@/components/admin";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { prisma } from "@/lib/db";

export default async function AdminSettingsPage() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        id: "default",
        siteName: "Dr. Winnie's Foundation",
        tagline: "",
        description: "",
        email: "",
        phone: "",
        whatsapp: "",
        whatsappLink: "",
        addressLine1: "",
        city: "",
        region: "",
        country: "",
        hoursWeekdays: "",
        socialLinks: {},
      },
    });
  }

  return (
    <div>
      <PageHeader title="Settings" description="Edit site-wide settings" />
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
