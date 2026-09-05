import { z } from "zod";

export const mentorMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  recommendation: z.string().optional(),
  why: z.string().optional(),
  implementationSteps: z.array(z.string()).optional(),
  risks: z.array(z.string()).optional(),
  timeLimitedAlternative: z.string().optional(),
  createdAt: z.string(),
});

export const mentorPayloadSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  projectId: z.string().optional(),
});

export type MentorMessage = z.infer<typeof mentorMessageSchema>;
export type MentorPayload = z.infer<typeof mentorPayloadSchema>;
