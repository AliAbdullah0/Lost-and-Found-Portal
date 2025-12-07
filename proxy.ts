import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("student")
  const pathname = request.nextUrl.pathname

  if (cookie && pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/register"],
}
