"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminField, AdminForm, AdminInput } from "@/components/admin";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registration failed");
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
      <h1 className="text-lg font-semibold text-white">Create account</h1>
      <p className="mt-1 text-sm text-white/50">Register as an admin user</p>
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
            Create account
          </button>
        }
      >
        <AdminField label="Name" required>
          <AdminInput name="name" type="text" autoComplete="name" required />
        </AdminField>
        <AdminField label="Email" required>
          <AdminInput name="email" type="email" autoComplete="email" required />
        </AdminField>
        <AdminField label="Password" required hint="Minimum 8 characters">
          <AdminInput
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </AdminField>
      </AdminForm>
      <p className="mt-4 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link href="/admin/login" className="text-[#2563EB] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
