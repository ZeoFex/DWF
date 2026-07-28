"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  AdminEditButton,
  DataTable,
  PageHeader,
  StatusBadge,
  publishStatusVariant,
} from "@/components/admin";
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
            className="inline-flex items-center rounded-md bg-[#E85A28] px-4 py-2 text-sm font-medium text-white hover:bg-[#D14E20]"
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
            cell: (t) => <span className="font-medium text-[#1E1E1E]">{t.author}</span>,
          },
          { key: "role", header: "Role", cell: (t) => t.role },
          { key: "featured", header: "Featured", cell: (t) => (t.featured ? "Yes" : "—") },
          {
            key: "status",
            header: "Status",
            cell: (t) => <StatusBadge label={t.status} variant={publishStatusVariant(t.status)} />,
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (t) => (
              <AdminEditButton
                onClick={() => router.push(`/admin/testimonials?edit=${t.id}`)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export function TestimonialsAdminClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-[#1E1E1E]/50">Loading...</div>}>
      <TestimonialsAdminInner testimonials={testimonials} />
    </Suspense>
  );
}
