import { NextResponse } from "next/server";
import { mentorPayloadSchema } from "@/lib/validation/mentor";
import { generateMentorResponse } from "@/lib/ai/mentor-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, profile, projectTitle } = body;

    const validation = mentorPayloadSchema.safeParse({ message });
    if (!validation.success) {
      return NextResponse.json({ success: false, error: "Invalid message payload" }, { status: 400 });
    }

    const mentorReply = await generateMentorResponse(message, profile, projectTitle);

    return NextResponse.json({
      success: true,
      message: mentorReply,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
