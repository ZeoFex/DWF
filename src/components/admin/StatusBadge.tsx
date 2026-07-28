import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-[#1D4ED8]",
  draft: "bg-gray-100 text-gray-600",
  published: "bg-emerald-50 text-emerald-700",
  archived: "bg-amber-50 text-amber-700",
  pending: "bg-amber-50 text-amber-700",
  new: "bg-[#2563EB]/10 text-[#1D4ED8]",
  reviewed: "bg-gray-100 text-gray-600",
  closed: "bg-gray-100 text-gray-500",
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
