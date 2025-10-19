import { NextRequest, NextResponse } from "next/server";
import { getServerSession, withErrorHandler } from "../utils";
import { prisma } from "@/lib/db";
import { addActivitySchema, addActivitySchemaForPayout } from "./schema";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const activities = await prisma.activity.findMany({
    where: { userId: address },
    orderBy: { created_at: "desc" },
  });
  return NextResponse.json({ data: activities });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const body = await req.json();

  const { title, type, sig, amount, group_pda } = addActivitySchema.parse(body);

  await prisma.activity.create({
    data: { title, type, userId: address, sig, amount, group_pda },
  });
  return NextResponse.json({ ok: true });
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  getServerSession(req);
  const body = await req.json();

  const { title, type, sig, amount, group_pda, recipient } = addActivitySchemaForPayout.parse(body);

  await prisma.activity.create({
    data: { title, type, userId: recipient, sig, amount, group_pda },
  });
  return NextResponse.json({ ok: true });
});
