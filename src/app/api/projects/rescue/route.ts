/**
 * @file route.ts
 * @description POST /api/projects/rescue — AI Scope Explosion Detection & Project Rescue Endpoint.
 * @module APIRescue
 */

import { NextResponse } from "next/server";
import { studentProfileSchema } from "@/lib/validation/profile";
import { rescueProjectScope } from "@/lib/scoring/rescue-engine";
import { logError } from "@/lib/logger";

/**
 * Handles POST requests to detect scope explosion and rescope projects into buildable MVPs.
 * @param {Request} req - Incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response containing RescueResult object.
 */
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
    logError("Rescue API Error:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
