"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Building2,
  CreditCard,
  Heart,
  Loader2,
  Smartphone,
  Users,
} from "lucide-react";
import { projects } from "@/content";
import {
  confirmMockPayment,
  createDonationIntent,
  isMockPaymentMode,
  PAYMENT_DISCLAIMER,
} from "@/lib/payments";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { PaymentIntent } from "@/types";

interface DonationFormProps {
  className?: string;
  defaultProjectSlug?: string;
}

type DonationType =
  | "one-time"
  | "monthly"
  | "corporate"
  | "sponsor-girl"
  | "sponsor-outreach";

type PaymentMethod = "mobile-money" | "visa" | "mastercard" | "bank-transfer";

type FormStep = "details" | "confirm" | "success";

const inputClass =
  "w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-[#1E1E1E]";

const suggestedAmounts = [50, 100, 250, 500, 1000];

const donationTypes: {
  value: DonationType;
  label: string;
  description: string;
  icon: typeof Heart;
}[] = [
  {
    value: "one-time",
    label: "One-time",
    description: "Make a single donation",
    icon: Heart,
  },
  {
    value: "monthly",
    label: "Monthly",
    description: "Recurring monthly support",
    icon: Heart,
  },
  {
    value: "corporate",
    label: "Corporate",
    description: "Business or organizational giving",
    icon: Building2,
  },
  {
    value: "sponsor-girl",
    label: "Sponsor a Girl",
    description: "Support one girl's full program",
    icon: Users,
  },
  {
    value: "sponsor-outreach",
    label: "Sponsor Outreach",
    description: "Fund a community outreach event",
    icon: Users,
  },
];

const paymentMethods: {
  value: PaymentMethod;
  label: string;
  icon: typeof CreditCard;
}[] = [
  { value: "mobile-money", label: "Mobile Money", icon: Smartphone },
  { value: "visa", label: "Visa", icon: CreditCard },
  { value: "mastercard", label: "Mastercard", icon: CreditCard },
  { value: "bank-transfer", label: "Bank Transfer", icon: Building2 },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function DonationForm({
  className,
  defaultProjectSlug,
}: DonationFormProps) {
  const [step, setStep] = useState<FormStep>("details");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);

  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [amount, setAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile-money");
  const [projectSlug, setProjectSlug] = useState(defaultProjectSlug ?? "");
  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    message: "",
    anonymous: false,
  });

  const finalAmount =
    amount ?? (customAmount ? parseFloat(customAmount) : 0);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!finalAmount || finalAmount <= 0)
      next.amount = "Please select or enter a valid amount.";
    if (!form.anonymous && !form.donorName.trim())
      next.donorName = "Name is required unless donating anonymously.";
    if (!form.anonymous && !form.donorEmail.trim())
      next.donorEmail = "Email is required unless donating anonymously.";
    else if (
      form.donorEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.donorEmail)
    )
      next.donorEmail = "Please enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmitDetails = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStep("confirm");
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    setErrors({});

    try {
      const intent = await createDonationIntent({
        amount: finalAmount,
        currency: "GHS",
        donorName: form.anonymous ? undefined : form.donorName,
        donorEmail: form.anonymous ? undefined : form.donorEmail,
        projectSlug: projectSlug || undefined,
        message: form.message || undefined,
        donationType,
        paymentMethod,
        isAnonymous: form.anonymous,
      });

      const confirmed = await confirmMockPayment(intent.id);
      setPaymentIntent(confirmed);
      setStep("success");
    } catch {
      setErrors({ submit: "Unable to process mock payment. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (step === "success" && paymentIntent) {
    return (
      <div
        className={cn(
          "rounded-2xl border-2 border-[#F0A070] bg-[#F0A070]/10 p-6",
          className
        )}
        role="status"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-[#F0A070]" aria-hidden="true" />
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1E1E1E]">
              Demo Confirmation — No Payment Processed
            </h3>
            <p className="mt-2 text-sm text-[#1E1E1E]/80">
              {paymentIntent.message}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#1E1E1E]/60">Reference ID</dt>
                <dd className="font-mono text-xs">{paymentIntent.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#1E1E1E]/60">Amount</dt>
                <dd className="font-semibold">{formatCurrency(finalAmount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#1E1E1E]/60">Status</dt>
                <dd className="font-semibold text-[#782882]">Mock / Demo Only</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-[#1E1E1E]/60">
              Online payment processing is not live. To donate directly, contact{" "}
              <a
                href="mailto:info@drwynettesfoundation.org"
                className="text-[#46A0DC] underline"
              >
                info@drwynettesfoundation.org
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    const selectedType = donationTypes.find((t) => t.value === donationType);
    const selectedPayment = paymentMethods.find((p) => p.value === paymentMethod);

    return (
      <div className={cn("space-y-6", className)}>
        <div className="rounded-2xl bg-[#46A0DC]/5 p-6">
          <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
            Donation Summary
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#1E1E1E]/60">Type</dt>
              <dd className="font-medium">{selectedType?.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#1E1E1E]/60">Amount</dt>
              <dd className="font-semibold text-[#46A0DC]">
                {formatCurrency(finalAmount)}
                {donationType === "monthly" && "/month"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#1E1E1E]/60">Payment method</dt>
              <dd className="font-medium">{selectedPayment?.label}</dd>
            </div>
            {projectSlug && (
              <div className="flex justify-between">
                <dt className="text-[#1E1E1E]/60">Project</dt>
                <dd className="font-medium">
                  {projects.find((p) => p.slug === projectSlug)?.title ??
                    projectSlug}
                </dd>
              </div>
            )}
            {!form.anonymous && form.donorName && (
              <div className="flex justify-between">
                <dt className="text-[#1E1E1E]/60">Donor</dt>
                <dd className="font-medium">{form.donorName}</dd>
              </div>
            )}
            {form.anonymous && (
              <div className="flex justify-between">
                <dt className="text-[#1E1E1E]/60">Donor</dt>
                <dd className="font-medium italic">Anonymous</dd>
              </div>
            )}
          </dl>
        </div>

        <div
          className="flex items-start gap-3 rounded-xl border border-[#F0A070]/50 bg-[#F0A070]/10 p-4"
          role="alert"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-[#8a6d1a]" aria-hidden="true" />
          <p className="text-sm text-[#1E1E1E]/80">{PAYMENT_DISCLAIMER}</p>
        </div>

        {errors.submit && (
          <p className="text-sm text-[#E85A28]" role="alert">
            {errors.submit}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setStep("details")}
            disabled={loading}
            className="sm:flex-1"
          >
            Back
          </Button>
          <Button
            variant="coral"
            onClick={handleConfirmPayment}
            disabled={loading}
            className="sm:flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Processing demo payment…
              </>
            ) : (
              "Confirm Demo Donation"
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmitDetails}
      className={cn("space-y-8", className)}
      noValidate
    >
      {isMockPaymentMode() && (
        <div
          className="flex items-start gap-3 rounded-xl border border-[#F0A070]/50 bg-[#F0A070]/10 p-4"
          role="note"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-[#8a6d1a]" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-[#1E1E1E]">
              Demo Mode — Payments Not Live
            </p>
            <p className="mt-1 text-sm text-[#1E1E1E]/70">{PAYMENT_DISCLAIMER}</p>
          </div>
        </div>
      )}

      <fieldset>
        <legend className={labelClass}>Donation type</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {donationTypes.map((type) => {
            const Icon = type.icon;
            return (
              <label
                key={type.value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors",
                  donationType === type.value
                    ? "border-[#46A0DC] bg-[#46A0DC]/5"
                    : "border-[#46A0DC]/15 hover:border-[#46A0DC]/30"
                )}
              >
                <input
                  type="radio"
                  name="donationType"
                  value={type.value}
                  checked={donationType === type.value}
                  onChange={() => setDonationType(type.value)}
                  className="sr-only"
                />
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#46A0DC]" aria-hidden="true" />
                <div>
                  <span className="font-medium text-[#1E1E1E]">{type.label}</span>
                  <p className="text-xs text-[#1E1E1E]/60">{type.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>
          Select amount (GHS) <span className="text-[#E85A28]">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestedAmounts.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
              }}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2",
                amount === value
                  ? "bg-[#46A0DC] text-white"
                  : "bg-[#46A0DC]/10 text-[#46A0DC] hover:bg-[#46A0DC]/20"
              )}
            >
              {formatCurrency(value)}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label htmlFor="customAmount" className="sr-only">
            Custom amount
          </label>
          <input
            id="customAmount"
            type="number"
            min="1"
            step="1"
            placeholder="Custom amount (GHS)"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(null);
            }}
            className={inputClass}
            aria-invalid={errors.amount ? "true" : undefined}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-xs text-[#E85A28]" role="alert">
            {errors.amount}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="projectSlug" className={labelClass}>
          Support a project (optional)
        </label>
        <select
          id="projectSlug"
          value={projectSlug}
          onChange={(e) => setProjectSlug(e.target.value)}
          className={inputClass}
        >
          <option value="">General fund</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>Payment method</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <label
                key={method.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors",
                  paymentMethod === method.value
                    ? "border-[#46A0DC] bg-[#46A0DC]/5"
                    : "border-[#46A0DC]/15 hover:border-[#46A0DC]/30"
                )}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={() => setPaymentMethod(method.value)}
                  className="sr-only"
                />
                <Icon className="h-5 w-5 text-[#46A0DC]" aria-hidden="true" />
                <span className="text-sm font-medium">{method.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-5 rounded-2xl bg-[#F5FAFE] p-6">
        <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
          Donor details
        </h3>

        <div className="flex items-center gap-3">
          <input
            id="anonymous"
            type="checkbox"
            checked={form.anonymous}
            onChange={(e) =>
              setForm((f) => ({ ...f, anonymous: e.target.checked }))
            }
            className="h-4 w-4 rounded border-[#46A0DC]/30 text-[#46A0DC] focus-visible:ring-2 focus-visible:ring-[#46A0DC]"
          />
          <label htmlFor="anonymous" className="text-sm text-[#1E1E1E]/80">
            Donate anonymously
          </label>
        </div>

        {!form.anonymous && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="donorName" className={labelClass}>
                Full name <span className="text-[#E85A28]">*</span>
              </label>
              <input
                id="donorName"
                type="text"
                value={form.donorName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, donorName: e.target.value }))
                }
                className={inputClass}
                aria-invalid={errors.donorName ? "true" : undefined}
              />
              {errors.donorName && (
                <p className="mt-1 text-xs text-[#E85A28]" role="alert">
                  {errors.donorName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="donorEmail" className={labelClass}>
                Email <span className="text-[#E85A28]">*</span>
              </label>
              <input
                id="donorEmail"
                type="email"
                value={form.donorEmail}
                onChange={(e) =>
                  setForm((f) => ({ ...f, donorEmail: e.target.value }))
                }
                className={inputClass}
                aria-invalid={errors.donorEmail ? "true" : undefined}
              />
              {errors.donorEmail && (
                <p className="mt-1 text-xs text-[#E85A28]" role="alert">
                  {errors.donorEmail}
                </p>
              )}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="message" className={labelClass}>
            Message (optional)
          </label>
          <textarea
            id="message"
            rows={3}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className={cn(inputClass, "resize-y")}
            placeholder="Dedicate your donation or leave a note"
          />
        </div>
      </div>

      <Button type="submit" variant="coral" fullWidth size="lg">
        Review Donation
      </Button>
    </form>
  );
}
