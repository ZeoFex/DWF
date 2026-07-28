import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const editButtonClass =
  "inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/85 hover:bg-white/10 hover:text-white";

type AdminEditLinkProps = {
  href: string;
  label?: string;
  className?: string;
};

export function AdminEditLink({
  href,
  label = "Edit",
  className,
}: AdminEditLinkProps) {
  return (
    <Link href={href} className={cn(editButtonClass, className)}>
      <Pencil className="h-3 w-3" aria-hidden />
      {label}
    </Link>
  );
}

type AdminEditButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
};

export function AdminEditButton({
  onClick,
  label = "Edit",
  className,
}: AdminEditButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(editButtonClass, className)}
    >
      <Pencil className="h-3 w-3" aria-hidden />
      {label}
    </button>
  );
}
