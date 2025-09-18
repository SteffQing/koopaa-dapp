import { NextRequest, NextResponse } from "next/server";
import { clearSession, createSession, getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { loginSchema } from "./schema";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
// import NovuWelcome from "./novu-welcome";

export async function DELETE() {
  const res = NextResponse.json({ data: "Logged out" });
  clearSession(res);

  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  return res;
}

export async function GET(req: NextRequest) {
  const session = getSession(req);

  if (!session) return NextResponse.json({ error: "No active session" }, { status: 401 });

  return NextResponse.json({ data: session });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body, "body");

    // const { address, message, signature, domain, uri } = loginSchema.parse(body);

    // const decodedMessage = Buffer.from(message, "base64");
    // const decodedSignature = Buffer.from(signature, "base64");
    // const publicKey = new PublicKey(address);

    // let isValid: boolean;
    // if (domain && uri) {
    // const statement = decodedMessage.toString();
    // const signInMessage = Buffer.from(`${statement}\nURI: ${uri}\nDomain: ${domain}`);
    // isValid = nacl.sign.detached.verify(signInMessage, decodedSignature, publicKey.toBytes());
    //   const expectedMessage = Buffer.from(`Koopaa login: ${parseInt(decodedMessage.toString().split(": ")[1])}`);
    //   isValid = nacl.sign.detached.verify(expectedMessage, decodedSignature, publicKey.toBytes());
    // } else {
    //   isValid = nacl.sign.detached.verify(decodedMessage, decodedSignature, publicKey.toBytes());
    // }

    // if (!isValid) {
    //   return NextResponse.json(
    //     { error: "The provided key and signatures are invalid and your login attempt is rejected" },
    //     { status: 401 }
    //   );
    // }

    const existingUser = await prisma.user.findUnique({
      where: { address },
    });

    if (!existingUser) {
      await Promise.all([
        prisma.user.create({
          data: {
            address,
          },
        }),
        // NovuWelcome(address),
      ]);
    }

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
        error: "Failed to create a session for you on KooPaa. Please try again or reach out to support",
      },
      { status: 500 }
    );
  }
}
