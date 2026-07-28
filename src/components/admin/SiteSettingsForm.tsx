"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminCheckbox,
  AdminField,
  AdminForm,
  AdminInput,
  AdminTextarea,
  MediaDropField,
} from "@/components/admin";
import type { SiteSettings } from "@/generated/prisma";

type SiteSettingsFormProps = {
  settings: SiteSettings;
};

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const socialLinks =
    typeof settings.socialLinks === "object" && settings.socialLinks !== null
      ? (settings.socialLinks as Record<string, string>)
      : {};

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      siteName: form.get("siteName"),
      tagline: form.get("tagline"),
      description: form.get("description"),
      email: form.get("email"),
      phone: form.get("phone"),
      whatsapp: form.get("whatsapp"),
      whatsappLink: form.get("whatsappLink"),
      addressLine1: form.get("addressLine1"),
      addressLine2: form.get("addressLine2") || null,
      city: form.get("city"),
      region: form.get("region"),
      country: form.get("country"),
      hoursWeekdays: form.get("hoursWeekdays"),
      hoursSaturday: form.get("hoursSaturday") || null,
      hoursSunday: form.get("hoursSunday") || null,
      hoursNote: form.get("hoursNote") || null,
      announcementText: form.get("announcementText") || null,
      announcementHref: form.get("announcementHref") || null,
      announcementActive: form.get("announcementActive") === "on",
      heroHeadline: form.get("heroHeadline") || null,
      heroSupporting: form.get("heroSupporting") || null,
      heroImageUrl: form.get("heroImageUrl") || null,
      aboutPreview: form.get("aboutPreview") || null,
      aboutImageUrl: form.get("aboutImageUrl") || null,
      socialLinks: {
        facebook: form.get("socialFacebook") || "",
        instagram: form.get("socialInstagram") || "",
        twitter: form.get("socialTwitter") || "",
        linkedin: form.get("socialLinkedin") || "",
        youtube: form.get("socialYoutube") || "",
      },
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      setSuccess("Settings saved successfully");
      router.refresh();
    } catch {
      setError("Unable to save settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl rounded-lg border border-white/10 bg-[#1A2438] p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <h2 className="text-sm font-semibold text-white">General</h2>
        <AdminField label="Site name" required>
          <AdminInput name="siteName" defaultValue={settings.siteName} required />
        </AdminField>
        <AdminField label="Tagline" required>
          <AdminInput name="tagline" defaultValue={settings.tagline} required />
        </AdminField>
        <AdminField label="Description" required>
          <AdminTextarea name="description" defaultValue={settings.description} required rows={3} />
        </AdminField>

        <h2 className="pt-2 text-sm font-semibold text-white">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Email" required>
            <AdminInput name="email" type="email" defaultValue={settings.email} required />
          </AdminField>
          <AdminField label="Phone" required>
            <AdminInput name="phone" defaultValue={settings.phone} required />
          </AdminField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="WhatsApp" required>
            <AdminInput name="whatsapp" defaultValue={settings.whatsapp} required />
          </AdminField>
          <AdminField label="WhatsApp link" required>
            <AdminInput name="whatsappLink" type="url" defaultValue={settings.whatsappLink} required />
          </AdminField>
        </div>

        <h2 className="pt-2 text-sm font-semibold text-white">Address</h2>
        <AdminField label="Address line 1" required>
          <AdminInput name="addressLine1" defaultValue={settings.addressLine1} required />
        </AdminField>
        <AdminField label="Address line 2">
          <AdminInput name="addressLine2" defaultValue={settings.addressLine2 ?? ""} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminField label="City" required>
            <AdminInput name="city" defaultValue={settings.city} required />
          </AdminField>
          <AdminField label="Region" required>
            <AdminInput name="region" defaultValue={settings.region} required />
          </AdminField>
          <AdminField label="Country" required>
            <AdminInput name="country" defaultValue={settings.country} required />
          </AdminField>
        </div>

        <h2 className="pt-2 text-sm font-semibold text-white">Hours</h2>
        <AdminField label="Weekdays" required>
          <AdminInput name="hoursWeekdays" defaultValue={settings.hoursWeekdays} required />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Saturday">
            <AdminInput name="hoursSaturday" defaultValue={settings.hoursSaturday ?? ""} />
          </AdminField>
          <AdminField label="Sunday">
            <AdminInput name="hoursSunday" defaultValue={settings.hoursSunday ?? ""} />
          </AdminField>
        </div>
        <AdminField label="Hours note">
          <AdminTextarea name="hoursNote" defaultValue={settings.hoursNote ?? ""} />
        </AdminField>

        <h2 className="pt-2 text-sm font-semibold text-white">Announcement bar</h2>
        <AdminCheckbox
          name="announcementActive"
          label="Show announcement"
          defaultChecked={settings.announcementActive}
        />
        <AdminField label="Announcement text">
          <AdminTextarea name="announcementText" defaultValue={settings.announcementText ?? ""} />
        </AdminField>
        <AdminField label="Announcement link">
          <AdminInput name="announcementHref" type="url" defaultValue={settings.announcementHref ?? ""} />
        </AdminField>

        <h2 className="pt-2 text-sm font-semibold text-white">Homepage</h2>
        <AdminField label="Hero headline">
          <AdminTextarea name="heroHeadline" defaultValue={settings.heroHeadline ?? ""} />
        </AdminField>
        <AdminField label="Hero supporting text">
          <AdminTextarea name="heroSupporting" defaultValue={settings.heroSupporting ?? ""} />
        </AdminField>
        <AdminField label="Hero image">
          <MediaDropField
            name="heroImageUrl"
            defaultValue={settings.heroImageUrl}
            folder="general"
            hint="Landscape orientation works best."
          />
        </AdminField>
        <AdminField label="About preview">
          <AdminTextarea name="aboutPreview" defaultValue={settings.aboutPreview ?? ""} />
        </AdminField>
        <AdminField label="About image">
          <MediaDropField
            name="aboutImageUrl"
            defaultValue={settings.aboutImageUrl}
            folder="general"
            hint="Landscape orientation works best."
          />
        </AdminField>

        <h2 className="pt-2 text-sm font-semibold text-white">Social links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Facebook">
            <AdminInput name="socialFacebook" type="url" defaultValue={socialLinks.facebook ?? ""} />
          </AdminField>
          <AdminField label="Instagram">
            <AdminInput name="socialInstagram" type="url" defaultValue={socialLinks.instagram ?? ""} />
          </AdminField>
          <AdminField label="Twitter / X">
            <AdminInput name="socialTwitter" type="url" defaultValue={socialLinks.twitter ?? ""} />
          </AdminField>
          <AdminField label="LinkedIn">
            <AdminInput name="socialLinkedin" type="url" defaultValue={socialLinks.linkedin ?? ""} />
          </AdminField>
          <AdminField label="YouTube">
            <AdminInput name="socialYoutube" type="url" defaultValue={socialLinks.youtube ?? ""} />
          </AdminField>
        </div>
      </AdminForm>
    </div>
  );
}
