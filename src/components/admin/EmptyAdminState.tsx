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
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#46A0DC]/30 bg-white px-6 py-12 text-center">
      {Icon ? (
        <div className="mb-3 rounded-full bg-[#46A0DC]/10 p-3 text-[#46A0DC]">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-sm font-medium text-[#1E1E1E]">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-[#1E1E1E]/50">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
