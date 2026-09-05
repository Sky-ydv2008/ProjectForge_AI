import { NextResponse } from "next/server";
import { publishRepoConfigSchema } from "@/lib/validation/publish";
import { GitHubAdapter } from "@/lib/integrations/github-adapter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { repoConfig, projectTitle, token } = body;

    const validation = publishRepoConfigSchema.safeParse(repoConfig);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Invalid repository configuration", issues: validation.error.issues },
        { status: 400 }
      );
    }

    const result = await GitHubAdapter.publishProject(
      token || "demo-token",
      validation.data,
      projectTitle
    );

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      repositoryUrl: result.repositoryUrl,
      commitSha: result.commitSha,
      repositoryName: result.repositoryName,
      isPrivate: result.isPrivate,
      publishedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
