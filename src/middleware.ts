import { NextResponse,NextRequest } from "next/server";

export async function middleware(request:NextRequest) {
  const path = request.nextUrl.pathname;
  const auth_routes = ['/signin','/signup','reset-password','my-account/reset_password'];
  const privet_routes = ['/account']; 
  const hasToken = request.cookies.get("floranza-t-value")?.value;

  if (privet_routes.includes(path) && !auth_routes.includes(path) && !hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (auth_routes.includes(path) && hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/login"],
};