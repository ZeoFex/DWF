"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminCheckbox,
  AdminField,
  AdminForm,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  ConfirmButton,
  MediaDropField,
} from "@/components/admin";
import { joinJsonArray, parseJsonArray } from "@/lib/admin-utils";
import type { Event } from "@/generated/prisma";

type EventFormProps = { event?: Event };

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const isNew = !event;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function toLocalDatetime(value?: Date | null) {
    if (!value) return "";
    const d = new Date(value);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);
    const startsAtRaw = String(form.get("startsAt") ?? "");
    const endsAtRaw = String(form.get("endsAt") ?? "");
    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description"),
      category: form.get("category"),
      startsAt: startsAtRaw ? new Date(startsAtRaw).toISOString() : "",
      endsAt: endsAtRaw ? new Date(endsAtRaw).toISOString() : null,
      location: form.get("location"),
      imageUrl: form.get("imageUrl") || null,
      registrationRequired: form.get("registrationRequired") === "on",
      isPast: form.get("isPast") === "on",
      galleryUrls: parseJsonArray(String(form.get("galleryUrls") ?? "")),
      status: form.get("status"),
    };

    try {
      const url = isNew ? "/api/admin/events" : `/api/admin/events/${event!.id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      setSuccess("Saved successfully");
      if (isNew && data.item?.id) router.push(`/admin/events/${data.item.id}`);
      else router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!event) return;
    const res = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-3xl rounded-lg border border-[#46A0DC]/15 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Title" required>
          <AdminInput name="title" defaultValue={event?.title} required />
        </AdminField>
        <AdminField label="Slug" required>
          <AdminInput name="slug" defaultValue={event?.slug} required />
        </AdminField>
        <AdminField label="Description" required>
          <AdminTextarea name="description" defaultValue={event?.description} required rows={5} />
        </AdminField>
        <AdminField label="Category" required>
          <AdminInput name="category" defaultValue={event?.category ?? "Community"} required />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Starts at" required>
            <AdminInput name="startsAt" type="datetime-local" defaultValue={toLocalDatetime(event?.startsAt)} required />
          </AdminField>
          <AdminField label="Ends at">
            <AdminInput name="endsAt" type="datetime-local" defaultValue={toLocalDatetime(event?.endsAt)} />
          </AdminField>
        </div>
        <AdminField label="Location" required>
          <AdminInput name="location" defaultValue={event?.location} required />
        </AdminField>
        <AdminField label="Image">
          <MediaDropField
            name="imageUrl"
            defaultValue={event?.imageUrl}
            folder="events"
            hint="Landscape orientation works best."
          />
        </AdminField>
        <AdminField label="Gallery URLs" hint="One per line">
          <AdminTextarea name="galleryUrls" defaultValue={joinJsonArray(event?.galleryUrls ?? [])} rows={3} />
        </AdminField>
        <div className="flex flex-wrap gap-4">
          <AdminCheckbox name="registrationRequired" label="Registration required" defaultChecked={event?.registrationRequired} />
          <AdminCheckbox name="isPast" label="Mark as past event" defaultChecked={event?.isPast} />
        </div>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue={event?.status ?? "PUBLISHED"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
      {!isNew ? (
        <div className="mt-4 border-t border-[#46A0DC]/15 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/events" />
        </div>
      ) : null}
    </div>
  );
}
