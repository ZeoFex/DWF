import Link from "next/link";
import { DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
import { prisma } from "@/lib/db";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <PageHeader title="Projects" description="Manage fundraising projects" actionHref="/admin/projects/new" />
      <DataTable
        data={projects}
        keyExtractor={(p) => p.id}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (p) => (
              <Link href={`/admin/projects/${p.id}`} className="font-medium text-[#2563EB] hover:underline">
                {p.title}
              </Link>
            ),
          },
          { key: "status", header: "Status", cell: (p) => p.status },
          {
            key: "publish",
            header: "Publish",
            cell: (p) => <StatusBadge label={p.publishStatus} variant={publishStatusVariant(p.publishStatus)} />,
          },
          { key: "featured", header: "Featured", cell: (p) => (p.featured ? "Yes" : "—") },
        ]}
      />
    </div>
  );
}
