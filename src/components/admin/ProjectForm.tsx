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
} from "@/components/admin";
import { joinJsonArray, parseJsonArray } from "@/lib/admin-utils";
import type { Project } from "@/generated/prisma";

type ProjectFormProps = { project?: Project };

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const isNew = !project;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      shortDescription: form.get("shortDescription"),
      status: form.get("status"),
      publishStatus: form.get("publishStatus"),
      featured: form.get("featured") === "on",
      goal: form.get("goal") ? Number(form.get("goal")) : null,
      raised: form.get("raised") ? Number(form.get("raised")) : null,
      currency: form.get("currency") || "GHS",
      girlsSupported: form.get("girlsSupported") ? Number(form.get("girlsSupported")) : null,
      location: form.get("location") || null,
      heroImageUrl: form.get("heroImageUrl") || null,
      videoUrl: form.get("videoUrl") || null,
      activities: parseJsonArray(String(form.get("activities") ?? "")),
      impact: parseJsonArray(String(form.get("impact") ?? "")),
      galleryUrls: parseJsonArray(String(form.get("galleryUrls") ?? "")),
    };

    try {
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${project.id}`;
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
      if (isNew && data.item?.id) router.push(`/admin/projects/${data.item.id}`);
      else router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!project) return;
    const res = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-3xl rounded-lg border border-gray-200 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Title" required>
          <AdminInput name="title" defaultValue={project?.title} required />
        </AdminField>
        <AdminField label="Slug" required>
          <AdminInput name="slug" defaultValue={project?.slug} required />
        </AdminField>
        <AdminField label="Short description" required>
          <AdminTextarea name="shortDescription" defaultValue={project?.shortDescription} required />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Project status">
            <AdminSelect name="status" defaultValue={project?.status ?? "ACTIVE"}>
              <option value="ACTIVE">Active</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="COMPLETED">Completed</option>
            </AdminSelect>
          </AdminField>
          <AdminField label="Publish status">
            <AdminSelect name="publishStatus" defaultValue={project?.publishStatus ?? "PUBLISHED"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </AdminSelect>
          </AdminField>
        </div>
        <AdminCheckbox name="featured" label="Featured project" defaultChecked={project?.featured} />
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminField label="Goal">
            <AdminInput name="goal" type="number" defaultValue={project?.goal ?? ""} />
          </AdminField>
          <AdminField label="Raised">
            <AdminInput name="raised" type="number" defaultValue={project?.raised ?? ""} />
          </AdminField>
          <AdminField label="Currency">
            <AdminInput name="currency" defaultValue={project?.currency ?? "GHS"} />
          </AdminField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Girls supported">
            <AdminInput name="girlsSupported" type="number" defaultValue={project?.girlsSupported ?? ""} />
          </AdminField>
          <AdminField label="Location">
            <AdminInput name="location" defaultValue={project?.location ?? ""} />
          </AdminField>
        </div>
        <AdminField label="Hero image URL">
          <AdminInput name="heroImageUrl" type="url" defaultValue={project?.heroImageUrl ?? ""} />
        </AdminField>
        <AdminField label="Video URL">
          <AdminInput name="videoUrl" type="url" defaultValue={project?.videoUrl ?? ""} />
        </AdminField>
        <AdminField label="Activities" hint="One per line">
          <AdminTextarea name="activities" defaultValue={joinJsonArray(project?.activities ?? [])} rows={3} />
        </AdminField>
        <AdminField label="Impact points" hint="One per line">
          <AdminTextarea name="impact" defaultValue={joinJsonArray(project?.impact ?? [])} rows={3} />
        </AdminField>
        <AdminField label="Gallery URLs" hint="One per line">
          <AdminTextarea name="galleryUrls" defaultValue={joinJsonArray(project?.galleryUrls ?? [])} rows={3} />
        </AdminField>
      </AdminForm>
      {!isNew ? (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/projects" />
        </div>
      ) : null}
    </div>
  );
}
