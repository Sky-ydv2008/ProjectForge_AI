import { NextResponse } from "next/server";

export async function POST() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({
      success: true,
      demoMode: true,
      authUrl: null,
      message: "GitHub Client ID unconfigured. Fallback to Demo GitHub Account.",
    });
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/integrations/github/callback`;
  const scope = "repo user workflow";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  return NextResponse.json({
    success: true,
    demoMode: false,
    authUrl,
  });
}
