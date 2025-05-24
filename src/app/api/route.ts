import { NextRequest, NextResponse } from "next/server";
import { getServerSession, withErrorHandler } from "./utils";
import { BASE_URL } from "@/lib/fetch";
import redis from "@/lib/redis";

async function generateShortCode(url: string, length = 10): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray)).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
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

  const url = `/savings/ajo/${pda}/join-ajo?inviter=${address}`;
  const code = await generateShortCode(url);
  await redis.set(code, url);

  return NextResponse.json({ data: `${BASE_URL}/invite/${code}` });
});
