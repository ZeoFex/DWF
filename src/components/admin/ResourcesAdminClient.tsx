"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
import { ResourceForm } from "@/components/admin/ResourceForm";
import type { Resource } from "@/generated/prisma";

type Props = { resources: Resource[] };

export function ResourcesAdminClient({ resources }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isNew = searchParams.get("new") === "1";
  const editing = isNew ? undefined : resources.find((r) => r.id === editId);

  return (
    <div>
      <PageHeader
        title="Resources"
        description="Manage downloadable resources"
        action={
          <button
            type="button"
            onClick={() => router.push("/admin/resources?new=1")}
            className="inline-flex items-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
          >
            New resource
          </button>
        }
      />
      {(isNew || editing) && (
        <div className="mb-6">
          <ResourceForm resource={editing} isNew={isNew} />
        </div>
      )}
      <DataTable
        data={resources}
        keyExtractor={(r) => r.id}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <button
                type="button"
                onClick={() => router.push(`/admin/resources?edit=${r.id}`)}
                className="font-medium text-[#2563EB] hover:underline"
              >
                {r.title}
              </button>
            ),
          },
          { key: "category", header: "Category", cell: (r) => r.category },
          { key: "format", header: "Format", cell: (r) => r.format },
          {
            key: "status",
            header: "Status",
            cell: (r) => <StatusBadge label={r.status} variant={publishStatusVariant(r.status)} />,
          },
        ]}
      />
      {!isNew && !editing && resources.length > 0 ? (
        <p className="mt-3 text-xs text-gray-500">Click a title to edit.</p>
      ) : null}
    </div>
  );
}
