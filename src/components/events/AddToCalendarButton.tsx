"use client";

import { CalendarPlus, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  downloadIcsFile,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface AddToCalendarButtonProps {
  event: Event;
  className?: string;
}

export function AddToCalendarButton({
  event,
  className,
}: AddToCalendarButtonProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-[#46A0DC]/20 bg-white px-4 py-2 text-sm font-medium text-[#46A0DC] transition-colors hover:bg-[#46A0DC]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <CalendarPlus className="h-4 w-4" aria-hidden="true" />
        Add to calendar
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute left-0 z-20 mt-2 min-w-[12rem] overflow-hidden rounded-xl border border-[#46A0DC]/10 bg-white py-1 shadow-lg"
        >
          <li role="none">
            <a
              role="menuitem"
              href={getGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-sm text-[#1E1E1E] transition-colors hover:bg-[#46A0DC]/5"
              onClick={() => setOpen(false)}
            >
              Google Calendar
            </a>
          </li>
          <li role="none">
            <a
              role="menuitem"
              href={getOutlookCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-sm text-[#1E1E1E] transition-colors hover:bg-[#46A0DC]/5"
              onClick={() => setOpen(false)}
            >
              Outlook
            </a>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="block w-full px-4 py-2.5 text-left text-sm text-[#1E1E1E] transition-colors hover:bg-[#46A0DC]/5"
              onClick={() => {
                downloadIcsFile(event);
                setOpen(false);
              }}
            >
              Download .ics file
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
