import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const auth_routes = ['/signin', '/signup', '/reset-password'];
  const private_routes = ['/dashboard', '/settings'];
  
  const dynamic_auth_patterns = [
    '/my-account/reset_password/',
  ];
  const dynamic_private_patterns = [
    '/account/',  
  ];

  const hasToken = request.cookies.get("floranza-t-value")?.value;

  const matchesDynamicAuthRoute = dynamic_auth_patterns.some(pattern => 
    path.startsWith(pattern)
  );
  const matchesDynamicPrivateRoute = dynamic_private_patterns.some(pattern => 
    path.startsWith(pattern)
  );

  if ((private_routes.includes(path) || matchesDynamicPrivateRoute) && !hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if ((auth_routes.includes(path) || matchesDynamicAuthRoute) && hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/login"],
};