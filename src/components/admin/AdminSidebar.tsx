"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Calendar,
  FolderOpen,
  Heart,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  Target,
  Users,
  Handshake,
  FolderKanban,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/programs", label: "Programs", icon: GraduationCap },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", icon: FolderOpen },
  { href: "/admin/resources", label: "Resources", icon: Target },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/impact", label: "Impact", icon: BarChart3 },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col bg-[#46A0DC] text-white lg:w-60">
      <div className="border-b border-white/20 px-4 py-4">
        <Link href="/admin" className="block">
          <span className="text-sm font-semibold tracking-wide">DWF Admin</span>
          <span className="mt-0.5 block text-xs text-[#1E1E1E]/80">
            Dr. Wynette&apos;s Foundation
          </span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-[#E85A28] text-white shadow-sm"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-white/20 p-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/15 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Logout
        </button>
      </div>
    </aside>
  );
}
