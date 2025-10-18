import { NextRequest, NextResponse } from "next/server";
import webhookProcessor from "./webhook";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const result = await webhookProcessor.processWebhook({} as any, Object.fromEntries(searchParams));
  return new NextResponse(String(result.response), { status: result.status });
}

// POST - Receive messages
export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await webhookProcessor.processWebhook(body, {});
  return new NextResponse("OK", { status: result.status });
}
