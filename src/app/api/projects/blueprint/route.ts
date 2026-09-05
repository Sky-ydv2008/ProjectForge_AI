import { NextResponse } from "next/server";
import { studentProfileSchema } from "@/lib/validation/profile";
import { generateTechnicalBlueprint } from "@/lib/ai/blueprint-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile, candidate, customProblemStatement } = body;

    const validation = studentProfileSchema.safeParse(profile);
    const profileData = validation.success ? validation.data : profile;

    const blueprint = await generateTechnicalBlueprint(profileData, candidate, customProblemStatement);

    return NextResponse.json({
      success: true,
      blueprint,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
