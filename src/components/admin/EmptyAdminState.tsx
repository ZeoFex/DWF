import type { LucideIcon } from "lucide-react";

type EmptyAdminStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyAdminState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyAdminStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
      {Icon ? (
        <div className="mb-3 rounded-full bg-gray-100 p-3 text-gray-400">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-sm font-medium text-[#111827]">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
