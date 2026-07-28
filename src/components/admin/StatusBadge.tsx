import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "bg-[#F5FAFE] text-[#1E1E1E]/70",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-[#46A0DC]/10 text-[#46A0DC]",
  draft: "bg-[#F5FAFE] text-[#1E1E1E]/60",
  published: "bg-emerald-50 text-emerald-700",
  archived: "bg-amber-50 text-amber-700",
  pending: "bg-amber-50 text-amber-700",
  new: "bg-[#46A0DC]/15 text-[#46A0DC]",
  reviewed: "bg-[#F5FAFE] text-[#1E1E1E]/60",
  closed: "bg-[#F5FAFE] text-[#1E1E1E]/45",
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
