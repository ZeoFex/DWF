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
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
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
            className="inline-flex items-center gap-2 rounded-md bg-[#E85A28] px-4 py-2 text-sm font-medium text-white hover:bg-[#D14E20] disabled:opacity-50"
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
      <label className="mb-1 block text-sm font-medium text-[#1E1E1E]">
        {label}
        {required ? <span className="text-[#E85A28]"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-[#1E1E1E]/50">{hint}</p> : null}
    </div>
  );
}

export const adminInputClass =
  "w-full rounded-md border border-[#46A0DC]/25 bg-white px-3 py-2 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/35 focus:border-[#46A0DC] focus:outline-none focus:ring-1 focus:ring-[#46A0DC]";

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
    <label className="flex items-center gap-2 text-sm text-[#1E1E1E]/80">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-[#46A0DC]/30 bg-white text-[#46A0DC] focus:ring-[#46A0DC]"
        {...props}
      />
      {label}
    </label>
  );
}
