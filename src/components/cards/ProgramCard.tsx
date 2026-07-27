import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Briefcase, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Program } from "@/types";

const iconMap = {
  heart: Heart,
  brain: Brain,
  briefcase: Briefcase,
} as const;

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  const Icon = iconMap[program.icon];

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={program.heroImageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/60 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#46A0DC] text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
          {program.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1E1E1E]/70">
          {program.shortDescription}
        </p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46A0DC] transition-colors hover:text-[#2E86C1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 rounded"
        >
          Learn more
          <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
