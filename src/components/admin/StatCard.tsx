import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  hint?: string;
  className?: string;
};

export function StatCard({ label, value, icon: Icon, hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <p className="mt-1 text-2xl font-semibold text-[#111827]">{value}</p>
          {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
        </div>
        {Icon ? (
          <div className="rounded-md bg-[#2563EB]/10 p-2 text-[#2563EB]">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
        ) : null}
      </div>
    </div>
  );
}
