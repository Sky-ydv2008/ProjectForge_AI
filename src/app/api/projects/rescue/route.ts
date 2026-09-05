import { NextResponse } from "next/server";
import { studentProfileSchema } from "@/lib/validation/profile";
import { rescueProjectScope } from "@/lib/scoring/rescue-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile, candidate } = body;

    const validation = studentProfileSchema.safeParse(profile);
    const profileData = validation.success ? validation.data : profile;

    const rescueResult = rescueProjectScope(profileData, candidate);

    return NextResponse.json({
      success: true,
      rescueResult,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
