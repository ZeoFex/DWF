"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-[#1E1E1E]";

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
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
          Our team will respond within 2 business days.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const field = (
    id: keyof typeof form,
    label: string,
    type = "text",
    required = false
  ) => (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-[#E85A28]"> *</span>}
      </label>
      {id === "message" ? (
        <textarea
          id={id}
          rows={5}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className={cn(inputClass, "resize-y")}
          disabled={status === "loading"}
          aria-invalid={errors[id] ? "true" : undefined}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className={inputClass}
          disabled={status === "loading"}
          aria-invalid={errors[id] ? "true" : undefined}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
        />
      )}
      {errors[id] && (
        <p id={`${id}-error`} className="mt-1 text-xs text-[#E85A28]" role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Full name", "text", true)}
        {field("email", "Email", "email", true)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("phone", "Phone (optional)", "tel")}
        {field("subject", "Subject", "text", true)}
      </div>
      {field("message", "Message", "textarea", true)}

      {status === "error" && (
        <p className="text-sm text-[#E85A28]" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" fullWidth disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
