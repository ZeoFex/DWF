import { clearAdminSessionCookie } from "@/lib/auth";
import { jsonOk } from "@/lib/admin-api";

export async function POST() {
  await clearAdminSessionCookie();
  return jsonOk({ ok: true });
}
