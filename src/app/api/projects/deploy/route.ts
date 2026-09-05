import { NextResponse } from "next/server";
import { VercelAdapter } from "@/lib/integrations/vercel-adapter";
import { RenderAdapter } from "@/lib/integrations/render-adapter";
import { DeploymentConfig } from "@/lib/integrations/deployment-provider";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, repositoryName, repositoryUrl, envVars } = body;

    const config: DeploymentConfig = {
      projectId: `proj-${Date.now()}`,
      provider: provider || "vercel",
      repositoryName: repositoryName || "medforge-ai-diagnostic",
      repositoryUrl: repositoryUrl || "https://github.com/alex-chen-dev/medforge-ai-diagnostic",
      branch: "main",
      framework: "nextjs",
      buildCommand: "npm run build",
      outputDirectory: ".next",
      envVars: envVars || [
        { key: "NEXT_PUBLIC_APP_URL", value: "http://localhost:3000", isSecret: false, isRequired: true },
        { key: "NEXT_PUBLIC_DEMO_MODE", value: "true", isSecret: false, isRequired: true },
      ],
    };

    let result;
    if (provider === "render") {
      const adapter = new RenderAdapter();
      result = await adapter.deploy(config);
    } else {
      const adapter = new VercelAdapter();
      result = await adapter.deploy(config);
    }

    return NextResponse.json({
      success: result.status === "live",
      deploymentResult: result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
