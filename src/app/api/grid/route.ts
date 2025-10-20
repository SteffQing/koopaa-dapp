import { NextRequest, NextResponse } from "next/server";
import { createAjoGroup } from "@/lib/grid/create_ajo.tx";
import { createAjoGroupSchema } from "@/app/(mobile-ui)/savings/create-ajo/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ajo = createAjoGroupSchema.parse(body);

    const address = req.headers.get("x-user-address");
    const auth = req.headers.get("authorization");

    if (!address || !auth) throw new Error("Error in authorization!");

    const res = await createAjoGroup(ajo, address, auth);
    return NextResponse.json({ data: res });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
