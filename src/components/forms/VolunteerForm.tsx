"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface VolunteerFormProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-[#1E1E1E]";

const interestOptions = [
  "Menstrual Health Programs",
  "Mental Health & Wellness",
  "Career Development",
  "Kit Assembly & Logistics",
  "Event Support",
  "Mentorship",
  "Administrative Support",
  "Other",
];

const ageRangeOptions = ["18–24", "25–34", "35–44", "45–54", "55+"];

const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible / as needed",
];

export function VolunteerForm({ className }: VolunteerFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    ageRange: "",
    areaOfInterest: "",
    availability: "",
    experience: "",
    motivation: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.ageRange) next.ageRange = "Please select an age range.";
    if (!form.areaOfInterest) next.areaOfInterest = "Please select an area of interest.";
    if (!form.availability) next.availability = "Please select your availability.";
    if (!form.motivation.trim()) next.motivation = "Please tell us why you want to volunteer.";
    if (!consent) next.consent = "You must agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
          Our volunteer coordinator will contact you within 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.fullName ? "true" : undefined}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.fullName}</p>
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
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.email}</p>
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
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Location <span className="text-[#E85A28]">*</span>
          </label>
          <input
            id="location"
            type="text"
            placeholder="City, Region"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.location ? "true" : undefined}
          />
          {errors.location && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ageRange" className={labelClass}>
            Age range <span className="text-[#E85A28]">*</span>
          </label>
          <select
            id="ageRange"
            value={form.ageRange}
            onChange={(e) => setForm((f) => ({ ...f, ageRange: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.ageRange ? "true" : undefined}
          >
            <option value="">Select age range</option>
            {ageRangeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.ageRange && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.ageRange}</p>
          )}
        </div>
        <div>
          <label htmlFor="areaOfInterest" className={labelClass}>
            Area of interest <span className="text-[#E85A28]">*</span>
          </label>
          <select
            id="areaOfInterest"
            value={form.areaOfInterest}
            onChange={(e) => setForm((f) => ({ ...f, areaOfInterest: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.areaOfInterest ? "true" : undefined}
          >
            <option value="">Select area</option>
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.areaOfInterest && (
            <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.areaOfInterest}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="availability" className={labelClass}>
          Availability <span className="text-[#E85A28]">*</span>
        </label>
        <select
          id="availability"
          value={form.availability}
          onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
          className={inputClass}
          disabled={status === "loading"}
          aria-invalid={errors.availability ? "true" : undefined}
        >
          <option value="">Select availability</option>
          {availabilityOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.availability && (
          <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.availability}</p>
        )}
      </div>

      <div>
        <label htmlFor="experience" className={labelClass}>
          Relevant experience
        </label>
        <textarea
          id="experience"
          rows={3}
          value={form.experience}
          onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
          className={cn(inputClass, "resize-y")}
          placeholder="Tell us about any relevant skills or experience (optional)"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="motivation" className={labelClass}>
          Why do you want to volunteer? <span className="text-[#E85A28]">*</span>
        </label>
        <textarea
          id="motivation"
          rows={4}
          value={form.motivation}
          onChange={(e) => setForm((f) => ({ ...f, motivation: e.target.value }))}
          className={cn(inputClass, "resize-y")}
          disabled={status === "loading"}
          aria-invalid={errors.motivation ? "true" : undefined}
        />
        {errors.motivation && (
          <p className="mt-1 text-xs text-[#E85A28]" role="alert">{errors.motivation}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[#46A0DC]/30 text-[#46A0DC] focus-visible:ring-2 focus-visible:ring-[#46A0DC]"
          disabled={status === "loading"}
          aria-invalid={errors.consent ? "true" : undefined}
        />
        <label htmlFor="consent" className="text-sm text-[#1E1E1E]/80">
          I agree to the foundation&apos;s volunteer policies and consent to being
          contacted about volunteer opportunities. <span className="text-[#E85A28]">*</span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-[#E85A28]" role="alert">{errors.consent}</p>
      )}

      {status === "error" && (
        <p className="text-sm text-[#E85A28]" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" fullWidth disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
