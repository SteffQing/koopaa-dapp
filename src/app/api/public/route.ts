import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Body", body);
  console.log("Headers", Object.values(req.headers));

  return NextResponse.json({ ok: true });
}
