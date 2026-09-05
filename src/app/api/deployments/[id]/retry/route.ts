import { NextResponse } from "next/server";
import { VercelAdapter } from "@/lib/integrations/vercel-adapter";
import { RenderAdapter } from "@/lib/integrations/render-adapter";
import { NetlifyAdapter } from "@/lib/integrations/netlify-adapter";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { provider, repositoryName } = body;

    const config = {
      projectId: params.id,
      provider: provider || "vercel",
      repositoryName: repositoryName || "medforge-ai-diagnostic",
      repositoryUrl: `https://github.com/alex-chen-dev/${repositoryName || "medforge-ai-diagnostic"}`,
      branch: "main",
      framework: "nextjs",
      buildCommand: "npm run build",
      outputDirectory: ".next",
      envVars: [],
    };

    let result;
    if (provider === "render") {
      const adapter = new RenderAdapter();
      result = await adapter.deploy(config);
    } else if (provider === "netlify") {
      const adapter = new NetlifyAdapter();
      result = await adapter.deploy(config);
    } else {
      const adapter = new VercelAdapter();
      result = await adapter.deploy(config);
    }

    return NextResponse.json({
      success: true,
      deploymentResult: result,
      retriedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
