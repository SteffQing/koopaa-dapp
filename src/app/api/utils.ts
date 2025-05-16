import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export function getSearchParams(searchParams: URLSearchParams) {
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (value && value !== "undefined") {
      params[key] = value;
    }
  });

  return params;
}

export function getServerSession(req: NextRequest) {
  const session = getSession(req);

  if (!session) throw new Error("No session found");
  return session;
}

export async function getUserFromSession(req: NextRequest) {
  const session = getServerSession(req);

  const user = await prisma.user.findUnique({ where: { address: session } });
  if (!user) throw new Error("Session doesn't point to a user");
  return user;
}

type Handler = (req: NextRequest) => Promise<NextResponse>;

export function withErrorHandler(handler: Handler): Handler {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: (error as Error).message || "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
