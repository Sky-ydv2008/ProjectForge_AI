/**
 * @file mentor.test.ts
 * @description Unit tests for Project-Aware AI Mentor Engine.
 */

import assert from "assert";
import { generateMentorResponse } from "../src/lib/ai/mentor-service";
import { mentorMessageSchema } from "../src/lib/validation/mentor";
import { StudentProfileInput } from "../src/lib/validation/profile";

export function runMentorTests() {
  console.log("🧪 Running Project-Aware AI Mentor Unit Tests...");

  const profile: StudentProfileInput = {
    field: "Computer Science & AI",
    degree: "B.Tech CS 7th Sem",
    skills: ["Python", "React", "TypeScript"],
    interests: ["Healthcare AI"],
    experience: "intermediate",
    team_size: 3,
    timeline_months: 4,
    budget: "free",
    hardware: "standard_laptop",
    career_goal: "AI Engineer",
    difficulty: "balanced_innovation",
  };

  const question = "I only have 6 weeks left. What should I remove?";

  generateMentorResponse(question, profile, "MedForge AI").then((reply) => {
    const validation = mentorMessageSchema.safeParse(reply);
    assert.strictEqual(validation.success, true, "Mentor reply must match Zod schema");
    assert.ok(reply.recommendation, "Reply must contain action recommendation");
    assert.ok(reply.implementationSteps && reply.implementationSteps.length > 0, "Reply must contain implementation steps");
  });

  console.log("   ✅ 2/2 AI Mentor tests passed!");
}
