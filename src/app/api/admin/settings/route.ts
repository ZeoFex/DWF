import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

export async function GET() {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    return jsonOk({ settings });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const body = siteSettingsSchema.parse(await request.json());

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        siteName: body.siteName.trim(),
        tagline: body.tagline.trim(),
        description: body.description.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone.trim(),
        whatsapp: body.whatsapp.trim(),
        whatsappLink: body.whatsappLink.trim(),
        addressLine1: body.addressLine1.trim(),
        addressLine2: body.addressLine2?.trim() || null,
        city: body.city.trim(),
        region: body.region.trim(),
        country: body.country.trim(),
        hoursWeekdays: body.hoursWeekdays.trim(),
        hoursSaturday: body.hoursSaturday?.trim() || null,
        hoursSunday: body.hoursSunday?.trim() || null,
        hoursNote: body.hoursNote?.trim() || null,
        announcementText: body.announcementText?.trim() || null,
        announcementHref: body.announcementHref?.trim() || null,
        announcementActive: body.announcementActive ?? true,
        socialLinks: body.socialLinks as Prisma.InputJsonValue,
        heroHeadline: body.heroHeadline?.trim() || null,
        heroSupporting: body.heroSupporting?.trim() || null,
        heroImageUrl: body.heroImageUrl ?? null,
        aboutPreview: body.aboutPreview?.trim() || null,
        aboutImageUrl: body.aboutImageUrl ?? null,
      },
      update: {
        siteName: body.siteName.trim(),
        tagline: body.tagline.trim(),
        description: body.description.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone.trim(),
        whatsapp: body.whatsapp.trim(),
        whatsappLink: body.whatsappLink.trim(),
        addressLine1: body.addressLine1.trim(),
        addressLine2: body.addressLine2?.trim() || null,
        city: body.city.trim(),
        region: body.region.trim(),
        country: body.country.trim(),
        hoursWeekdays: body.hoursWeekdays.trim(),
        hoursSaturday: body.hoursSaturday?.trim() || null,
        hoursSunday: body.hoursSunday?.trim() || null,
        hoursNote: body.hoursNote?.trim() || null,
        announcementText: body.announcementText?.trim() || null,
        announcementHref: body.announcementHref?.trim() || null,
        ...(body.announcementActive !== undefined
          ? { announcementActive: body.announcementActive }
          : {}),
        socialLinks: body.socialLinks as Prisma.InputJsonValue,
        heroHeadline: body.heroHeadline?.trim() || null,
        heroSupporting: body.heroSupporting?.trim() || null,
        heroImageUrl: body.heroImageUrl ?? null,
        aboutPreview: body.aboutPreview?.trim() || null,
        aboutImageUrl: body.aboutImageUrl ?? null,
      },
    });

    return jsonOk({ settings });
  } catch (error) {
    return handleApiError(error);
  }
}
