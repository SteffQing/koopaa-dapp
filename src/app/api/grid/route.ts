import { NextRequest, NextResponse } from "next/server";
import {
  approveJoinAjoGroup,
  createAjoGroup,
  requestJoinAjoGroup,
} from "@/lib/grid/ajo_group.setup";
import { createAjoGroupSchema } from "@/app/(mobile-ui)/savings/create-ajo/schema";
import { gridApproveJoinAjoSchema } from "../group/schema";

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
    console.log("grid post error", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Request Join
export async function PUT(req: NextRequest) {
  try {
    const { pda } = await req.json();
    if (!pda || typeof pda !== "string") throw new Error("No pda provided");

    const address = req.headers.get("x-user-address");
    const auth = req.headers.get("authorization");

    if (!address || !auth) throw new Error("Error in authorization!");

    const res = await requestJoinAjoGroup(pda, address, auth);
    return NextResponse.json({ data: res });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const params = gridApproveJoinAjoSchema.parse(body);

    const address = req.headers.get("x-user-address");
    const auth = req.headers.get("authorization");

    if (!address || !auth) throw new Error("Error in authorization!");

    const res = await approveJoinAjoGroup(params, address, auth);
    return NextResponse.json({ data: res });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
