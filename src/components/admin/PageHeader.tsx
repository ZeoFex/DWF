import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
};

export function PageHeader({
  title,
  description,
  action,
  actionHref,
  actionLabel = "New",
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-[#111827]">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        ) : null}
      </div>
      {action ??
        (actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
          >
            {actionLabel}
          </Link>
        ) : null)}
    </div>
  );
}
