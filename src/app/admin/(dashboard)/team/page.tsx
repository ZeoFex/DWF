import { TeamAdminClient } from "@/components/admin/TeamAdminClient";
import { prisma } from "@/lib/db";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return <TeamAdminClient members={members} />;
}
