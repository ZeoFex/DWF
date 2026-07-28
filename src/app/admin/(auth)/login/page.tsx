"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminField, AdminForm, AdminInput } from "@/components/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-white">Sign in</h1>
      <p className="mt-1 text-sm text-white/50">Access the admin dashboard</p>
      <AdminForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        className="mt-6"
        footer={
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50"
          >
            Sign in
          </button>
        }
      >
        <AdminField label="Email" required>
          <AdminInput name="email" type="email" autoComplete="email" required />
        </AdminField>
        <AdminField label="Password" required>
          <AdminInput
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </AdminField>
      </AdminForm>
      <p className="mt-4 text-center text-sm text-white/50">
        Need an account?{" "}
        <Link href="/admin/register" className="text-[#2563EB] hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
