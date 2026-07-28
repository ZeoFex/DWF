"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ConfirmButtonProps = {
  label?: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void> | void;
  variant?: "danger" | "secondary";
  className?: string;
  redirectTo?: string;
};

export function ConfirmButton({
  label = "Delete",
  confirmLabel = "Confirm delete",
  onConfirm,
  variant = "danger",
  className = "",
  redirectTo,
}: ConfirmButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={
          variant === "danger"
            ? `inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 ${className}`
            : `inline-flex items-center gap-1.5 rounded-md border border-[#46A0DC]/25 bg-white px-3 py-1.5 text-sm text-[#1E1E1E]/80 hover:bg-[#F5FAFE] ${className}`
        }
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
        {label}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={loading}
        onClick={handleConfirm}
        className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-[#1E1E1E] hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : null}
        {confirmLabel}
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => setConfirming(false)}
        className="rounded-md px-3 py-1.5 text-sm text-[#1E1E1E]/55 hover:text-[#1E1E1E]"
      >
        Cancel
      </button>
    </div>
  );
}
