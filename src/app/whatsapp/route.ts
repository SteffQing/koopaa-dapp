import { NextRequest, NextResponse } from "next/server";
import webhookProcessor from "./webhook";
import type { IncomingMessage } from "whatsapp-client-sdk";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await webhookProcessor.processWebhook(
    {} as unknown as IncomingMessage,
    Object.fromEntries(searchParams)
  );
  return new NextResponse(String(result.response), { status: result.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await webhookProcessor.processWebhook(body, {});
  return new NextResponse("OK", { status: result.status });
}
