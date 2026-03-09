import { NextResponse } from "next/server" 
import type { NextRequest } from "next/server" 
 
export function proxy(request: NextRequest) { 
  const hasSession = request.cookies.get("sb-access-token") || request.cookies.get("sb-refresh-token") 
 
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard") 
 
  if (isDashboard && !hasSession) { 
    return NextResponse.redirect(new URL("/login", request.url)) 
  } 
 
  return NextResponse.next() 
} 
 
export const config = { 
  matcher: ["/dashboard/:path*"], 
} 
