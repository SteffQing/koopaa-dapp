import { NextRequest, NextResponse } from "next/server";
import { clearSession, createSession, getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { withErrorHandler } from "../utils";

export async function DELETE()
{
  const res = NextResponse.json({ data: "Logged out" });
  clearSession(res);

  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  return res;
}

export async function GET(req: NextRequest)
{
  const session = getSession(req);

  if (!session)
    return NextResponse.json({ error: "No active session" }, { status: 401 });

  return NextResponse.json({ data: session });
}

export async function POST(req: NextRequest)
{
  try {
    const { address } = await req.json();

    if (!address)
      return NextResponse.json(
        { error: "Wallet address is required to sign you in" },
        { status: 400 }
      );

    const existingUser = await prisma.user.findUnique({
      where: { address },
    });

    if (!existingUser)
      await prisma.user.create({
        data: {
          address,
        },
      });

    const res = NextResponse.json({
      message: existingUser
        ? "You have been successfully signed in. Welcome back to KooPaa!"
        : "Your account has been successfully created. Welcome to KooPaa!",
    });

    createSession(res, address);

    return res;
  } catch (error) {
    console.error("Error creating user session:", error);
    return NextResponse.json(
      {
        error:
          "Failed to create a session for you on KooPaa. Please try again or reach out to support",
      },
      { status: 500 }
    );
  }
}
