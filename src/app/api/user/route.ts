import { NextRequest, NextResponse } from "next/server";
import {
  getServerSession,
  getUserFromSession,
  withErrorHandler,
} from "../utils";
import prisma from "@/lib/prisma";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const user = await getUserFromSession(req);
  return NextResponse.json(user); // `user` should already be serializable
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const [{ username }, address] = await Promise.all([
    req.json(),
    getServerSession(req),
  ]);
  await prisma.user.update({ where: { address }, data: { username } });
  return NextResponse.json({ message: "Username has been successfully added" });
});
