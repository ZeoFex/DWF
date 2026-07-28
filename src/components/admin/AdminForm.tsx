"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { FormHTMLAttributes, ReactNode } from "react";

type AdminFormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
  footer?: ReactNode;
};

export function AdminForm({
  children,
  loading = false,
  error,
  success,
  footer,
  className,
  ...props
}: AdminFormProps) {
  return (
    <form className={cn("space-y-4", className)} {...props}>
      {error ? (
        <div className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {success}
        </div>
      ) : null}
      <fieldset disabled={loading} className="space-y-4 disabled:opacity-60">
        {children}
      </fieldset>
      {footer ?? (
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Save
          </button>
        </div>
      )}
    </form>
  );
}

export function AdminField({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-white/85">
        {label}
        {required ? <span className="text-red-400"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

export const adminInputClass =
  "w-full rounded-md border border-white/15 bg-[#0F1729] px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]";

export const adminTextareaClass = cn(adminInputClass, "min-h-[100px] resize-y");

export const adminSelectClass = adminInputClass;

export function AdminInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className={adminInputClass} {...props} />;
}

export function AdminTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea className={adminTextareaClass} {...props} />;
}

export function AdminSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return <select className={adminSelectClass} {...props} />;
}

export function AdminCheckbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-white/75">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-white/20 bg-[#0F1729] text-[#2563EB] focus:ring-[#2563EB]"
        {...props}
      />
      {label}
    </label>
  );
}
