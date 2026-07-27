"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Event } from "@/types";

interface EventRegistrationFormProps {
  event: Event;
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-[#1E1E1E]";

export function EventRegistrationForm({
  event,
  className,
}: EventRegistrationFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    dietaryRequirements: "",
    accessibilityNeeds: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    const guests = parseInt(form.guests, 10);
    if (!guests || guests < 1) next.guests = "Please enter at least 1 guest.";
    if (!consent) next.consent = "You must agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl bg-[#782882]/10 p-6 text-center",
          className
        )}
        role="status"
      >
        <p className="font-semibold text-[#782882]">
          Thank you, we received your message.
        </p>
        <p className="mt-2 text-sm text-[#1E1E1E]/70">
          You&apos;re registered for <strong>{event.title}</strong>. A
          confirmation email will be sent shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      <p className="text-sm text-[#1E1E1E]/70">
        Register for <strong>{event.title}</strong> on{" "}
        {new Date(event.date).toLocaleDateString("en-GH", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        at {event.time}.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-fullName" className={labelClass}>
            Full name <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="reg-fullName"
            type="text"
            value={form.fullName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullName: e.target.value }))
            }
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.fullName ? "true" : undefined}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="reg-email" className={labelClass}>
            Email <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.email ? "true" : undefined}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-phone" className={labelClass}>
            Phone <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="reg-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.phone ? "true" : undefined}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="reg-guests" className={labelClass}>
            Number of guests <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="reg-guests"
            type="number"
            min="1"
            max="10"
            value={form.guests}
            onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.guests ? "true" : undefined}
          />
          {errors.guests && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">
              {errors.guests}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="reg-dietary" className={labelClass}>
          Dietary requirements
        </label>
        <input
          id="reg-dietary"
          type="text"
          value={form.dietaryRequirements}
          onChange={(e) =>
            setForm((f) => ({ ...f, dietaryRequirements: e.target.value }))
          }
          className={inputClass}
          placeholder="Optional"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="reg-accessibility" className={labelClass}>
          Accessibility needs
        </label>
        <textarea
          id="reg-accessibility"
          rows={2}
          value={form.accessibilityNeeds}
          onChange={(e) =>
            setForm((f) => ({ ...f, accessibilityNeeds: e.target.value }))
          }
          className={cn(inputClass, "resize-y")}
          placeholder="Let us know if you need any accommodations (optional)"
          disabled={status === "loading"}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="reg-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[#46A0DC]/30 text-[#46A0DC] focus-visible:ring-2 focus-visible:ring-[#46A0DC]"
          disabled={status === "loading"}
          aria-invalid={errors.consent ? "true" : undefined}
        />
        <label htmlFor="reg-consent" className="text-sm text-[#1E1E1E]/80">
          I agree to receive event-related communications and consent to the
          foundation&apos;s privacy policy.{" "}
          <span className="text-[#E85A28]">*</span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-[#E85A28]" role="alert">
          {errors.consent}
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-[#E85A28]" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" fullWidth disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
            Registering…
          </>
        ) : (
          "Register for Event"
        )}
      </Button>
    </form>
  );
}
