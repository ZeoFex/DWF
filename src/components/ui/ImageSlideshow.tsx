"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryImage } from "@/types";

type ImageSlideshowProps = {
  images: { url: string; alt?: string; caption?: string }[];
  className?: string;
  intervalMs?: number;
};

export function ImageSlideshow({
  images,
  className,
  intervalMs = 4500,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = images.length;
  const current = images[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (count <= 1 || paused || reduceMotion) return;
    const id = window.setInterval(goNext, intervalMs);
    return () => window.clearInterval(id);
  }, [count, paused, reduceMotion, intervalMs, goNext]);

  if (count === 0) return null;

  const lightboxImages: GalleryImage[] = images.map((img, i) => ({
    url: img.url,
    alt: img.alt ?? `Gallery photo ${i + 1}`,
    caption: img.caption ?? "",
  }));

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className="relative overflow-hidden rounded-2xl bg-[#E8F4FC] shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          className="relative block aspect-[16/10] w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open larger view of gallery photo"
        >
          <Image
            key={current.url}
            src={current.url}
            alt={current.alt ?? `Gallery photo ${index + 1}`}
            fill
            className="object-cover motion-safe:animate-[fadeUp_0.45s_ease-out]"
            sizes="(max-width: 1024px) 100vw, 960px"
            priority={index === 0}
          />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1E1E1E] shadow hover:bg-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1E1E1E] shadow hover:bg-white"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="rounded-full p-1 text-white hover:bg-white/15"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              >
                {paused || reduceMotion ? (
                  <Play className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <Pause className="h-3.5 w-3.5" aria-hidden />
                )}
              </button>
              <div className="flex gap-1.5">
                {images.map((img, i) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      i === index ? "w-5 bg-white" : "bg-white/50 hover:bg-white/80"
                    )}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
              <span className="pl-1 text-xs font-medium text-white/90">
                {index + 1}/{count}
              </span>
            </div>
          </>
        )}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={index}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setIndex}
      />
    </div>
  );
}
