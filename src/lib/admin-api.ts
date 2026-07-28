import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAdminSession, type AdminSession } from "@/lib/auth";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(
  message: string,
  status = 400,
  details?: unknown
) {
  return NextResponse.json(
    {
      error: message,
      ...(details !== undefined ? { details } : {}),
    },
    { status }
  );
}

export async function requireAdminApi(): Promise<AdminSession | NextResponse> {
  const session = await getAdminSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }
  return session;
}

export function isAdminResponse(
  value: AdminSession | NextResponse
): value is NextResponse {
  return value instanceof NextResponse;
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError("Validation failed", 422, error.flatten());
  }
  console.error("[api]", error);
  return jsonError("Internal server error", 500);
}
