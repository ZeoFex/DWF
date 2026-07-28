"use client";

import { LogOut, User } from "lucide-react";
import type { AdminSession } from "@/lib/auth";

type AdminTopbarProps = {
  session: AdminSession;
};

export function AdminTopbar({ session }: AdminTopbarProps) {
  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#0F1729] px-4 lg:px-6">
      <div className="text-sm text-white/55">Content Management</div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 text-sm sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB]/20 text-[#60A5FA]">
            <User className="h-4 w-4" aria-hidden />
          </div>
          <div className="text-right">
            <p className="font-medium text-white">{session.name}</p>
            <p className="text-xs text-white/55">{session.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
