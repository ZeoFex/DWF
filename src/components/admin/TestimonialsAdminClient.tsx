"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import type { Testimonial } from "@/generated/prisma";

function TestimonialsAdminInner({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isNew = searchParams.get("new") === "1";
  const editing = isNew ? undefined : testimonials.find((t) => t.id === editId);

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage testimonials"
        action={
          <button
            type="button"
            onClick={() => router.push("/admin/testimonials?new=1")}
            className="inline-flex items-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
          >
            New testimonial
          </button>
        }
      />
      {(isNew || editing) && (
        <div className="mb-6">
          <TestimonialForm testimonial={editing} isNew={isNew} />
        </div>
      )}
      <DataTable
        data={testimonials}
        keyExtractor={(t) => t.id}
        columns={[
          {
            key: "author",
            header: "Author",
            cell: (t) => (
              <button
                type="button"
                onClick={() => router.push(`/admin/testimonials?edit=${t.id}`)}
                className="font-medium text-[#2563EB] hover:underline"
              >
                {t.author}
              </button>
            ),
          },
          { key: "role", header: "Role", cell: (t) => t.role },
          { key: "featured", header: "Featured", cell: (t) => (t.featured ? "Yes" : "—") },
          {
            key: "status",
            header: "Status",
            cell: (t) => <StatusBadge label={t.status} variant={publishStatusVariant(t.status)} />,
          },
        ]}
      />
    </div>
  );
}

export function TestimonialsAdminClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
      <TestimonialsAdminInner testimonials={testimonials} />
    </Suspense>
  );
}
