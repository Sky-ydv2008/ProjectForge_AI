/**
 * @file route.ts
 * @description POST /api/projects/generate — Server-side AI candidate project generator endpoint.
 * @module APIGenerate
 */

import { NextResponse } from "next/server";
import { studentProfileSchema } from "@/lib/validation/profile";
import { generateProjectCandidates } from "@/lib/ai/service";
import { sanitizeInputText } from "@/lib/security/sanitizer";
import { logError } from "@/lib/logger";

/**
 * Handles POST requests to generate 8 skill-tailored project candidates.
 * @param {Request} req - Incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing array of 8 project candidates.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Sanitize text fields
    if (body.field) body.field = sanitizeInputText(body.field);
    if (body.career_goal) body.career_goal = sanitizeInputText(body.career_goal);

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
    logError("Generate API Error:", msg);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
