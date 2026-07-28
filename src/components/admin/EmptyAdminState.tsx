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
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#1A2438] px-6 py-12 text-center">
      {Icon ? (
        <div className="mb-3 rounded-full bg-white/10 p-3 text-white/40">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-sm font-medium text-white">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-white/50">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
