import { AdminEditLink, DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
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
            cell: (p) => <span className="font-medium text-[#1E1E1E]">{p.title}</span>,
          },
          { key: "status", header: "Status", cell: (p) => p.status },
          {
            key: "publish",
            header: "Publish",
            cell: (p) => <StatusBadge label={p.publishStatus} variant={publishStatusVariant(p.publishStatus)} />,
          },
          { key: "featured", header: "Featured", cell: (p) => (p.featured ? "Yes" : "—") },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (p) => <AdminEditLink href={`/admin/projects/${p.id}`} />,
          },
        ]}
      />
    </div>
  );
}
