import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Dummy URL allows `prisma generate` on CI when DATABASE_URL is not injected yet
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@localhost:5432/dwf?schema=public",
  },
});
