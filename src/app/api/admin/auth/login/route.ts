import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  createAdminSessionToken,
  setAdminSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/admin-api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());
    const user = await prisma.adminUser.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      return jsonError("Invalid email or password", 401);
    }

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) {
      return jsonError("Invalid email or password", 401);
    }

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = await createAdminSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    await setAdminSessionCookie(token);

    return jsonOk({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
