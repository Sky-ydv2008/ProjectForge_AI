import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const deploymentId = params.id;

  return NextResponse.json({
    success: true,
    deployment: {
      id: deploymentId,
      status: "live",
      deploymentUrl: "https://medforge-ai-diagnostic.vercel.app",
      commitSha: "a1b2c3d4e5f",
      provider: "vercel",
      createdAt: new Date().toISOString(),
    },
  });
}
