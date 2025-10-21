import { NextRequest, NextResponse } from "next/server";
import fetchBalances from "../balance";
import { getServerSession } from "../utils";

export async function GET(req: NextRequest) {
  try {
    const address = getServerSession(req);
    const balances = await fetchBalances(address);
    return NextResponse.json({ data: balances });
  } catch (error) {
    console.error("error fetching server session balance", error);
    return NextResponse.json({ error: String(error) });
  }
}
