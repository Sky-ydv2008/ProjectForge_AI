import { NextResponse } from "next/server";
import { studentProfileSchema } from "@/lib/validation/profile";
import { generateProjectCandidates } from "@/lib/ai/service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate incoming profile with Zod
    const validation = studentProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid student profile inputs",
          issues: validation.error.issues,
        },
        { status: 400 }
      );
    }

    // Call server-side AI generation service
    const output = await generateProjectCandidates(validation.data);

    return NextResponse.json({
      success: true,
      projects: output.projects,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
