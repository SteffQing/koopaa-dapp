import { Redis } from "@upstash/redis";

const REDIS_URL = process.env.UPSTASH_REDIS_URL;
const REDIS_KEY = process.env.UPSTASH_REDIS_TOKEN;

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_KEY,
});

export default redis;
