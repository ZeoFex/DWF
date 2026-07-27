import { cn } from "@/lib/utils";

interface CampaignProgressProps {
  goal: number;
  raised: number;
  currency?: string;
  label?: string;
  showAmounts?: boolean;
  className?: string;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CampaignProgress({
  goal,
  raised,
  currency = "GHS",
  label = "Campaign progress",
  showAmounts = true,
  className,
}: CampaignProgressProps) {
  const percentage = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-4">
        <p className="text-sm font-medium text-[#1E1E1E]">{label}</p>
        <p className="text-sm font-semibold text-[#46A0DC]">{percentage}%</p>
      </div>

      <div
        className="h-3 overflow-hidden rounded-full bg-[#46A0DC]/10"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${percentage}% complete`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#46A0DC] to-[#782882] motion-safe:transition-all motion-safe:duration-1000 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showAmounts && (
        <div className="flex flex-wrap justify-between gap-2 text-sm text-[#1E1E1E]/70">
          <span>
            Raised:{" "}
            <strong className="text-[#1E1E1E]">
              {formatCurrency(raised, currency)}
            </strong>
          </span>
          <span>
            Goal:{" "}
            <strong className="text-[#1E1E1E]">
              {formatCurrency(goal, currency)}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
