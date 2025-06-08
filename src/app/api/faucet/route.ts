import redis from "@/lib/redis";
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession, withErrorHandler } from "../utils";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const [claimedUSDC, claimedSOL] = await Promise.all([
    redis.sismember("claimedUSDC", address),
    redis.sismember("claimedSOL", address),
  ]);
  const response = {
    claimedUSDC: claimedUSDC === 1,
    claimedSOL: claimedSOL === 1,
  };
  return NextResponse.json({ data: response });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const { claimedUSDC, claimedSOL } = await req.json();
  await Promise.all([
    claimedUSDC && redis.sadd("claimedUSDC", address),
    claimedSOL && redis.sadd("claimedSOL", address),
  ]);
  const allClaimed = claimedUSDC && claimedSOL;
  return NextResponse.json({
    message: `
${allClaimed ? "USDC & SOL" : claimedUSDC ? "USDC" : claimedSOL ? "SOL" : "No token"} has been successfully claimed!
You can proceed to make interactions on KooPaa app 🫧
`,
  });
});
