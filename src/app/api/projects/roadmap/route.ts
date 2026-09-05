import { NextResponse } from "next/server";
import { studentProfileSchema } from "@/lib/validation/profile";
import { generateProjectRoadmap } from "@/lib/ai/roadmap-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile, projectTitle } = body;

    const validation = studentProfileSchema.safeParse(profile);
    const profileData = validation.success ? validation.data : profile;

    const roadmap = await generateProjectRoadmap(profileData, projectTitle);

    return NextResponse.json({
      success: true,
      roadmap,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
