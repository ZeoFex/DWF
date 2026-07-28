"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NewsletterFormProps {
  className?: string;
  variant?: "default" | "dark";
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#46A0DC]/20 bg-white px-4 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2";

export function NewsletterForm({
  className,
  variant = "default",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-xl p-4 text-sm",
          variant === "dark"
            ? "bg-white/10 text-white"
            : "bg-[#782882]/10 text-[#782882]",
          className
        )}
        role="status"
      >
        Thank you for subscribing! We&apos;ll keep you updated on our work.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3 sm:flex-row", className)}
      noValidate
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            inputClass,
            variant === "dark" &&
              "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white"
          )}
          disabled={status === "loading"}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        {error && (
          <p
            id="newsletter-error"
            className={cn(
              "mt-1.5 text-xs",
              variant === "dark" ? "text-[#E85A28]" : "text-[#E85A28]"
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant={variant === "dark" ? "coral" : "primary"}
        disabled={status === "loading"}
        className="shrink-0"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Subscribing…
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
