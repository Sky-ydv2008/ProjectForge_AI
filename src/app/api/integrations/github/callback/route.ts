import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/publish?error=missing_oauth_code", req.url));
  }

  // Redirect back to Publish Center with authorization code parameter
  return NextResponse.redirect(new URL(`/publish?github_connected=true&code=${code}`, req.url));
}
