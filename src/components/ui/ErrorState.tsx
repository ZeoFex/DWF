import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-[#E85A28]/30 bg-[#E85A28]/5 px-6 py-12 text-center",
        className
      )}
      role="alert"
    >
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E85A28]/10 text-[#E85A28]"
        aria-hidden="true"
      >
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-[#1E1E1E]/70">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-6">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
