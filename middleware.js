import { NextResponse } from "next/server";
q;
const allowedOrigins = [
  "http://localhost:9229",
  "http://127.0.0.1:9229",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://pixelsnag.it.com",
];

export function middleware(request) {
  const origin = request.headers.get("origin");
  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
