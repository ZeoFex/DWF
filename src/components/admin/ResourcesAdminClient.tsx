"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  AdminEditButton,
  DataTable,
  PageHeader,
  StatusBadge,
  publishStatusVariant,
} from "@/components/admin";
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
            className="inline-flex items-center rounded-md bg-[#E85A28] px-4 py-2 text-sm font-medium text-white hover:bg-[#D14E20]"
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
            cell: (r) => <span className="font-medium text-[#1E1E1E]">{r.title}</span>,
          },
          { key: "category", header: "Category", cell: (r) => r.category },
          { key: "format", header: "Format", cell: (r) => r.format },
          {
            key: "status",
            header: "Status",
            cell: (r) => <StatusBadge label={r.status} variant={publishStatusVariant(r.status)} />,
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (r) => (
              <AdminEditButton onClick={() => router.push(`/admin/resources?edit=${r.id}`)} />
            ),
          },
        ]}
      />
    </div>
  );
}
