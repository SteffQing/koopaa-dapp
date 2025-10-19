import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { externalLoginSchema, JWT_SECRET } from "../schema";
import { SignJWT } from "jose";
import { withErrorHandler, getSearchParams } from "../../utils";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const body = getSearchParams(req);
  const { id } = externalLoginSchema.parse(body);
  id.replace(/\D/g, "");

  const user = await prisma.user.findUnique({ where: { externalId: id } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: user });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { id } = externalLoginSchema.parse(body);
  id.replace(/\D/g, "");

  const user = await prisma.user.findUnique({
    where: { externalId: id },
    select: { address: true, email: true, username: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: "We could not find any matching information for you. Please sign up and retry signing in" },
      { status: 404 }
    );
  }

  const jwt = await new SignJWT({ address: user.address })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(JWT_SECRET);

  return NextResponse.json({
    data: { token: jwt, user: { ...user, externalId: id } },
    message: `Welcome back to KooPaa ${user.username}`,
  });
});
