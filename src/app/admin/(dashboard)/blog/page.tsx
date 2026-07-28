import { format } from "date-fns";
import {
  AdminEditLink,
  DataTable,
  PageHeader,
  StatusBadge,
  publishStatusVariant,
} from "@/components/admin";
import { prisma } from "@/lib/db";

export default async function AdminBlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      category: true,
      status: true,
      featured: true,
      updatedAt: true,
    },
  });

  return (
    <div>
      <PageHeader
        title="Blog posts"
        description="Manage news and stories"
        actionHref="/admin/blog/new"
        actionLabel="New post"
      />
      <DataTable
        data={posts}
        keyExtractor={(p) => p.id}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (p) => <span className="font-medium text-[#1E1E1E]">{p.title}</span>,
          },
          { key: "category", header: "Category", cell: (p) => p.category },
          {
            key: "status",
            header: "Status",
            cell: (p) => (
              <StatusBadge label={p.status} variant={publishStatusVariant(p.status)} />
            ),
          },
          {
            key: "featured",
            header: "Featured",
            cell: (p) => (p.featured ? "Yes" : "—"),
          },
          {
            key: "updated",
            header: "Updated",
            cell: (p) => format(p.updatedAt, "MMM d, yyyy"),
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (p) => <AdminEditLink href={`/admin/blog/${p.id}`} />,
          },
        ]}
      />
    </div>
  );
}
