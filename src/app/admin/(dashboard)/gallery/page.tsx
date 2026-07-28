import { AdminEditLink, DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
import { NewGalleryAlbumForm } from "@/components/admin/NewGalleryAlbumForm";
import { prisma } from "@/lib/db";

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <PageHeader title="Gallery" description="Manage photo albums" />
      <NewGalleryAlbumForm />
      <div className="mt-6">
        <DataTable
          data={albums}
          keyExtractor={(a) => a.id}
          columns={[
            {
              key: "title",
              header: "Album",
              cell: (a) => <span className="font-medium text-white">{a.title}</span>,
            },
            { key: "items", header: "Items", cell: (a) => a._count.items },
            {
              key: "status",
              header: "Status",
              cell: (a) => <StatusBadge label={a.status} variant={publishStatusVariant(a.status)} />,
            },
            {
              key: "actions",
              header: "",
              className: "text-right",
              cell: (a) => <AdminEditLink href={`/admin/gallery/${a.id}`} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
