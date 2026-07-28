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
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#46A0DC]/15 bg-white px-4 lg:px-6">
      <div className="text-sm text-[#1E1E1E]/55">Content Management</div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 text-sm sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#46A0DC]/15 text-[#46A0DC]">
            <User className="h-4 w-4" aria-hidden />
          </div>
          <div className="text-right">
            <p className="font-medium text-[#1E1E1E]">{session.name}</p>
            <p className="text-xs text-[#1E1E1E]/55">{session.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#46A0DC]/25 bg-white px-3 py-1.5 text-sm text-[#1E1E1E]/80 hover:border-[#E85A28]/40 hover:text-[#E85A28]"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
