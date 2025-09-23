import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientInitializationError } from "../../../prisma-client/runtime/library";

export function getSearchParams(request: NextRequest) {
  const params: Record<string, string> = {};
  const searchParams = request.nextUrl.searchParams;

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

type Handler<Args extends unknown[] = [NextRequest]> = (...args: Args) => Promise<NextResponse>;

export function withErrorHandler<Args extends unknown[]>(handler: Handler<Args>): Handler<Args> {
  return async (...args: Args): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        return NextResponse.json(
          { error: "Unable to connect to the database. Please check your connection and try again." },
          { status: 503 }
        );
      } else {
        console.error(error);
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
      }
    }
  };
}
