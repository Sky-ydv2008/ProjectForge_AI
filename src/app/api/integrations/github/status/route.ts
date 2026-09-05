import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    status: {
      provider: "github",
      oauthConfigured: Boolean(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID),
      demoModeActive: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
    },
  });
}
