"use client";

import { useState } from "react";
import { Check, Copy, Facebook, Linkedin, Link2, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">
        Share this article
      </h2>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2 text-sm font-medium text-[#46A0DC] transition-colors hover:bg-[#46A0DC]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-[#782882]" aria-hidden="true" />
              Link copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy link
            </>
          )}
        </button>

        {shareLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex items-center gap-2 rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2 text-sm font-medium text-[#46A0DC] transition-colors hover:bg-[#46A0DC]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{label.split(" ").slice(2).join(" ")}</span>
            <Link2 className="h-4 w-4 sm:hidden" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
