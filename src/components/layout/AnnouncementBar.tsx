"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "dwf-announcement-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { announcementBar } = siteConfig;
    if (!announcementBar.text) return;

    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed || !announcementBar.dismissible) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* sessionStorage unavailable */
    }
  };

  if (!visible) return null;

  const { announcementBar } = siteConfig;

  return (
    <div
      className="relative bg-[#46A0DC] text-white"
      role="region"
      aria-label="Announcement"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2.5 pr-12 sm:px-6 lg:px-8">
        {announcementBar.href ? (
          <Link
            href={announcementBar.href}
            className="text-center text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#46A0DC] rounded"
          >
            {announcementBar.text}
          </Link>
        ) : (
          <p className="text-center text-sm font-medium">{announcementBar.text}</p>
        )}

        {announcementBar.dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors",
              "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#46A0DC]"
            )}
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
