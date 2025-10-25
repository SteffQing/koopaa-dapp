import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from "../../../prisma-client/runtime/library";
import { ZodError } from "zod";

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
  const session = req.headers.get("x-user-address");

  if (!session) throw new Error("No user found");
  return session;
}

export async function getUserFromSession(req: NextRequest) {
  const session = getServerSession(req);

  const user = await prisma.user.findUnique({ where: { address: session } });
  if (!user) throw new Error("Session doesn't point to a user");
  return user;
}

type Handler<Args extends unknown[] = [NextRequest]> = (
  ...args: Args
) => Promise<NextResponse>;

export function withErrorHandler<Args extends unknown[]>(
  handler: Handler<Args>
): Handler<Args> {
  return async (...args: Args): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error(error, "withErrorHandler");
      if (
        error instanceof PrismaClientInitializationError ||
        error instanceof PrismaClientRustPanicError ||
        error instanceof PrismaClientUnknownRequestError
      ) {
        console.log(error.message, error.name, error.clientVersion);
        return NextResponse.json(
          {
            error:
              "Unable to connect to the database. Please check your connection and try again.",
          },
          { status: 503 }
        );
      } else if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P1001":
            return NextResponse.json(
              {
                error: "Database temporarily unreachable. Please try again",
              },
              { status: 503 }
            );
          case "P2002":
            return NextResponse.json(
              { error: `Duplicate value for ${error.meta?.target}.` },
              { status: 409 }
            );
          case "P2003":
            return NextResponse.json(
              { error: "Invalid relation or foreign key constraint." },
              { status: 400 }
            );
          case "P2025":
            return NextResponse.json(
              { error: "Record not found." },
              { status: 404 }
            );
          default:
            return NextResponse.json(
              { error: "Database error occurred." },
              { status: 500 }
            );
        }
      } else if (error instanceof ZodError) {
        const details = error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ");
        return NextResponse.json(
          { error: `Invalid request data — ${details}` },
          { status: 400 }
        );
      } else {
        console.error(error);
        return NextResponse.json(
          { error: (error as Error).message || "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  };
}
