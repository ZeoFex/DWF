import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma";

async function main() {
  const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {
    arrayMode: false,
    fullResults: true,
  });
  const prisma = new PrismaClient({ adapter });
  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: "wdf@gmail.com" },
    });
    console.log(
      user
        ? { email: user.email, role: user.role, active: user.isActive }
        : "NO USER"
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
