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

  const message = error instanceof Error ? error.message : "Internal server error";

  // Surface actionable configuration issues instead of a blank 500
  if (
    message.includes("DATABASE_URL") ||
    message.includes("ADMIN_JWT_SECRET") ||
    message.includes("Cloudinary") ||
    message.includes("JWT")
  ) {
    return jsonError(message, 500);
  }

  return jsonError(
    process.env.NODE_ENV === "development" ? message : "Internal server error",
    500
  );
}
