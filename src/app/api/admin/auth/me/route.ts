import { getAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/admin-api";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  return jsonOk({
    user: {
      id: session.sub,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}
