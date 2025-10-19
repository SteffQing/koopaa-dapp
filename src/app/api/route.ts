import { NextRequest, NextResponse } from "next/server";
import { getSearchParams, getServerSession, withErrorHandler } from "./utils";
import { BASE_URL } from "@/lib/fetch";
import { prisma, redis } from "@/lib/db";

async function generateShortCode(url: string, length = 10): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray)).replace(/[^a-zA-Z0-9]/g, "");
  return base64.slice(0, length);
}

export const POST = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const { pda } = await req.json();

  if (!pda)
    return NextResponse.json(
      {
        error: "A pda value must be passed for the ajo group invite",
      },
      { status: 400 }
    );

  const url = `/savings/ajo/${pda}?inviter=${address}`;
  const code = await generateShortCode(url);
  await redis.set(code, url);

  return NextResponse.json({ data: `${BASE_URL}/invite/${code}` });
});

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { q } = getSearchParams(req);
  const query = q.trim();

  if (!query) return NextResponse.json({ data: [] });

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { address: { equals: query, mode: "insensitive" } }, // exact match for address
        { username: { contains: query, mode: "insensitive" } }, // partial match
        { email: { contains: query, mode: "insensitive" } }, // partial match
      ],
    },
    take: 20,
    select: { address: true },
  });
  const addresses = users.map((user) => user.address);
  return NextResponse.json({ data: addresses });
});
