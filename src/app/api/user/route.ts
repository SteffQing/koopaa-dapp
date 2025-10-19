import { NextRequest, NextResponse } from "next/server";
import {
  getServerSession,
  getUserFromSession,
  withErrorHandler,
} from "../utils";
import { prisma } from "@/lib/db";
import { isValidEmail } from "@/lib/utils";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const user = await getUserFromSession(req);
  return NextResponse.json({ data: user });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const [{ username }, address] = await Promise.all([
    req.json(),
    getServerSession(req),
  ]);
  await prisma.user.update({ where: { address }, data: { username } });
  return NextResponse.json({ message: "Username has been successfully added" });
});

export async function PATCH(req: NextRequest) {
  try {
    const address = getServerSession(req);
    const { username, email, avatar } = await req.json();

    if (username && typeof username !== "string") {
      return NextResponse.json(
        { error: "Invalid username format" },
        { status: 400 }
      );
    }

    if (email && typeof email !== "string" && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (avatar && typeof avatar !== "number" && avatar >= 1 && avatar <= 9) {
      return NextResponse.json(
        { error: "Invalid avatar format" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { address },
      data: {
        ...(username && { username }),
        ...(email && { email }),
        ...(avatar && { avatar }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
