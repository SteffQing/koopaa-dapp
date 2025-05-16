import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

const publicPaths = ["/login", "/api/auth"]

export async function middleware(request: NextRequest) {
  const session = getSession(request)
  const { pathname } = request.nextUrl

  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (!session && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  if (session && pathname === "/login") {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
