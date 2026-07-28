"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface PartnerFormProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-[#1E1E1E]";

const partnershipTypes = [
  "Corporate Sponsorship",
  "In-Kind Donation",
  "School Partnership",
  "Community Organization",
  "Media Partnership",
  "Grant Funding",
  "Other",
];

export function PartnerForm({ className }: PartnerFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "",
    proposedSupport: "",
    message: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.organizationName.trim())
      next.organizationName = "Organization or individual name is required.";
    if (!form.contactPerson.trim())
      next.contactPerson = "Contact person is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.partnershipType)
      next.partnershipType = "Please select a partnership type.";
    if (!form.proposedSupport.trim())
      next.proposedSupport = "Please describe your proposed support.";
    if (!form.message.trim()) next.message = "Please include a message.";
    if (!consent) next.consent = "You must agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: form.organizationName,
          contactPerson: form.contactPerson,
          email: form.email,
          phone: form.phone,
          partnershipType: form.partnershipType,
          proposedSupport: form.proposedSupport,
          message: form.message || undefined,
        }),
      });
      if (!response.ok) throw new Error("Failed");
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
          Our partnerships team will review your inquiry and respond soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      <div>
        <label htmlFor="organizationName" className={labelClass}>
          Individual or organization name <span className="text-[#E85A28]">*</span>
        </label>
        <input
          id="organizationName"
          type="text"
          value={form.organizationName}
          onChange={(e) =>
            setForm((f) => ({ ...f, organizationName: e.target.value }))
          }
          className={inputClass}
          disabled={status === "loading"}
          aria-invalid={errors.organizationName ? "true" : undefined}
        />
        {errors.organizationName && (
          <p className="mt-1 text-xs text-[#E85A28]" role="alert">
            {errors.organizationName}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contactPerson" className={labelClass}>
            Contact person <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="contactPerson"
            type="text"
            value={form.contactPerson}
            onChange={(e) =>
              setForm((f) => ({ ...f, contactPerson: e.target.value }))
            }
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.contactPerson ? "true" : undefined}
          />
          {errors.contactPerson && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">
              {errors.contactPerson}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="email"
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
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="phone"
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
          <label htmlFor="partnershipType" className={labelClass}>
            Partnership type <span className="text-[#E85A28]">*</span>
          </label>
          <select
            id="partnershipType"
            value={form.partnershipType}
            onChange={(e) =>
              setForm((f) => ({ ...f, partnershipType: e.target.value }))
            }
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.partnershipType ? "true" : undefined}
          >
            <option value="">Select type</option>
            {partnershipTypes.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.partnershipType && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">
              {errors.partnershipType}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="proposedSupport" className={labelClass}>
          Proposed support <span className="text-[#E85A28]">*</span>
        </label>
        <textarea
          id="proposedSupport"
          rows={3}
          value={form.proposedSupport}
          onChange={(e) =>
            setForm((f) => ({ ...f, proposedSupport: e.target.value }))
          }
          className={cn(inputClass, "resize-y")}
          placeholder="Describe how you'd like to partner with us"
          disabled={status === "loading"}
          aria-invalid={errors.proposedSupport ? "true" : undefined}
        />
        {errors.proposedSupport && (
          <p className="mt-1 text-xs text-[#E85A28]" role="alert">
            {errors.proposedSupport}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-[#E85A28]">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(inputClass, "resize-y")}
          disabled={status === "loading"}
          aria-invalid={errors.message ? "true" : undefined}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[#E85A28]" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="partner-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[#46A0DC]/30 text-[#46A0DC] focus-visible:ring-2 focus-visible:ring-[#46A0DC]"
          disabled={status === "loading"}
          aria-invalid={errors.consent ? "true" : undefined}
        />
        <label htmlFor="partner-consent" className="text-sm text-[#1E1E1E]/80">
          I consent to being contacted about partnership opportunities and agree
          to the foundation&apos;s privacy policy.{" "}
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
            Submitting…
          </>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
}
