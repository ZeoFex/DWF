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
        <h1 className="font-serif text-xl font-semibold text-[#1E1E1E]">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-[#1E1E1E]/55">{description}</p>
        ) : null}
      </div>
      {action ??
        (actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center rounded-md bg-[#E85A28] px-4 py-2 text-sm font-medium text-white hover:bg-[#D14E20]"
          >
            {actionLabel}
          </Link>
        ) : null)}
    </div>
  );
}
