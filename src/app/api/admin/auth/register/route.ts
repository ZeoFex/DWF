import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  createAdminSessionToken,
  hashPassword,
  isRegistrationOpen,
  setAdminSessionCookie,
} from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/admin-api";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120),
});

export async function POST(request: Request) {
  try {
    const body = registerSchema.parse(await request.json());
    const email = body.email.toLowerCase();

    const userCount = await prisma.adminUser.count();
    const registrationOpen = isRegistrationOpen();

    if (!registrationOpen && userCount > 0) {
      return jsonError("Registration is closed", 403);
    }

    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return jsonError("An account with this email already exists", 409);
    }

    const role = userCount === 0 ? "SUPER_ADMIN" : "EDITOR";
    const passwordHash = await hashPassword(body.password);

    const user = await prisma.adminUser.create({
      data: {
        email,
        name: body.name.trim(),
        passwordHash,
        role,
      },
    });

    const token = await createAdminSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    await setAdminSessionCookie(token);

    return jsonOk(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
