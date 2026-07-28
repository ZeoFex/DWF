import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it in Vercel Project Settings → Environment Variables."
    );
  }

  // HTTP adapter is the reliable choice for Vercel serverless + Neon
  const adapter = new PrismaNeonHttp(connectionString, {
    arrayMode: false,
    fullResults: true,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

/**
 * Lazy Prisma singleton.
 * Avoids requiring DATABASE_URL at module-import/build time.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    // Prevent treating the proxy as a Thenable/Promise
    if (prop === "then") return undefined;
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
