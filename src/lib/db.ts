import { PrismaClient } from "../../prisma-client";
import { Redis } from "@upstash/redis";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  redis: Redis;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const REDIS_URL = process.env.UPSTASH_REDIS_URL;
const REDIS_KEY = process.env.UPSTASH_REDIS_TOKEN;

if (!globalForPrisma.redis) {
  globalForPrisma.redis = new Redis({
    url: REDIS_URL,
    token: REDIS_KEY,
  });
}
const redis = globalForPrisma.redis;

export { prisma, redis };
