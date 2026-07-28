import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin";
import { GalleryAlbumDetail } from "@/components/admin/GalleryAlbumDetail";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminGalleryAlbumPage({ params }: PageProps) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
  if (!album) notFound();

  return (
    <div>
      <PageHeader title="Edit album" description={album.title} />
      <GalleryAlbumDetail album={album} items={album.items} />
    </div>
  );
}
