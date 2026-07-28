import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "bg-white/10 text-white/80",
  success: "bg-emerald-500/15 text-emerald-300",
  warning: "bg-amber-500/15 text-amber-300",
  danger: "bg-red-500/15 text-red-300",
  info: "bg-blue-500/15 text-[#60A5FA]",
  draft: "bg-white/10 text-white/60",
  published: "bg-emerald-500/15 text-emerald-300",
  archived: "bg-amber-500/15 text-amber-300",
  pending: "bg-amber-500/15 text-amber-300",
  new: "bg-[#2563EB]/25 text-[#93C5FD]",
  reviewed: "bg-white/10 text-white/60",
  closed: "bg-white/5 text-white/45",
} as const;

type StatusBadgeProps = {
  label: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
};

export function StatusBadge({ label, variant = "default", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium capitalize",
        VARIANTS[variant],
        className
      )}
    >
      {label.replace(/_/g, " ").toLowerCase()}
    </span>
  );
}

export function publishStatusVariant(status: string): keyof typeof VARIANTS {
  switch (status) {
    case "PUBLISHED":
      return "published";
    case "DRAFT":
      return "draft";
    case "ARCHIVED":
      return "archived";
    default:
      return "default";
  }
}

export function paymentStatusVariant(status: string): keyof typeof VARIANTS {
  switch (status) {
    case "MOCK_SUCCESS":
      return "success";
    case "PENDING":
      return "pending";
    case "FAILED":
    case "CANCELLED":
      return "danger";
    default:
      return "default";
  }
}

export function inquiryStatusVariant(status: string): keyof typeof VARIANTS {
  switch (status) {
    case "NEW":
      return "new";
    case "REVIEWED":
      return "reviewed";
    case "CLOSED":
      return "closed";
    default:
      return "default";
  }
}
