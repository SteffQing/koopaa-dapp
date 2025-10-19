import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loginSchema, JWT_SECRET } from "./schema";
import { SignJWT } from "jose";
// import { PublicKey } from "@solana/web3.js";
// import nacl from "tweetnacl";

export async function DELETE() {
  const res = NextResponse.json({ data: "Logged out successfully" });
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.cookies.delete("koopaa_token");
  return res;
}

export async function GET(req: NextRequest) {
  const address = req.headers.get("x-user-address");
  if (!address) return NextResponse.json({ error: "Missing user" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { address } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: user });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address } = loginSchema.parse(body);
    // Must add signing to prove account ownership

    const existingUser = await prisma.user.findUnique({
      where: { address },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          address,
        },
      });
    }

    const token = await new SignJWT({ address })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const res = NextResponse.json({
      message: existingUser
        ? "You have been successfully signed in. Welcome back to KooPaa!"
        : "Your account has been successfully created. Welcome to KooPaa!",
      token,
    });

    res.cookies.set({
      name: "koopaa_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("Error creating user session:", error);
    return NextResponse.json(
      {
        error: "Failed to create a session for you on KooPaa. Please try again or reach out to support",
      },
      { status: 500 }
    );
  }
}
