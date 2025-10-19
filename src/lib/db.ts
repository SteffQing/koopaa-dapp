import { PrismaClient } from "../../prisma-client";
import { Redis } from "@upstash/redis";
import { Client } from "@upstash/qstash";

const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

// await client.publish({
//   url: "https://example.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const REDIS_URL = process.env.UPSTASH_REDIS_URL;
const REDIS_KEY = process.env.UPSTASH_REDIS_TOKEN;

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_KEY,
});

export { prisma, redis, qstash };
