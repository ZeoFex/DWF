import { redirect } from "next/navigation";
import { AdminSidebar, AdminTopbar } from "@/components/admin";
import { getAdminSession } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar session={session} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
