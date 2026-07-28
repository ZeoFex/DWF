import { PageHeader } from "@/components/admin";
import { MediaGrid } from "@/components/admin/MediaGrid";
import { MediaUploadZone } from "@/components/admin/MediaUploadZone";
import { prisma } from "@/lib/db";

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <PageHeader title="Media library" description="Upload and manage media assets" />
      <MediaUploadZone />
      <div className="mt-6">
        <MediaGrid assets={assets} />
      </div>
    </div>
  );
}
