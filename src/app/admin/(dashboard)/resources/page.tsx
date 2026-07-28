import { Suspense } from "react";
import { ResourcesAdminClient } from "@/components/admin/ResourcesAdminClient";
import { prisma } from "@/lib/db";

export default async function AdminResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <Suspense fallback={<div className="text-sm text-[#1E1E1E]/50">Loading...</div>}>
      <ResourcesAdminClient resources={resources} />
    </Suspense>
  );
}
