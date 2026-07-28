import Link from "next/link";
import { DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
import { prisma } from "@/lib/db";

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  return (
    <div>
      <PageHeader
        title="Programs"
        description="Manage foundation programs"
        actionHref="/admin/programs/new"
        actionLabel="New program"
      />
      <DataTable
        data={programs}
        keyExtractor={(p) => p.id}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (p) => (
              <Link href={`/admin/programs/${p.id}`} className="font-medium text-[#2563EB] hover:underline">
                {p.title}
              </Link>
            ),
          },
          { key: "slug", header: "Slug", cell: (p) => p.slug },
          {
            key: "status",
            header: "Status",
            cell: (p) => <StatusBadge label={p.status} variant={publishStatusVariant(p.status)} />,
          },
          { key: "sort", header: "Order", cell: (p) => p.sortOrder },
        ]}
      />
    </div>
  );
}
