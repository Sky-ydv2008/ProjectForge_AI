/**
 * @file rescue.test.ts
 * @description Unit tests for Scope Explosion Detection & AI Rescue Engine.
 */

import assert from "assert";
import { rescueProjectScope, OVERAMBITIOUS_DEMO_PROJECT } from "../src/lib/scoring/rescue-engine";
import { StudentProfileInput } from "../src/lib/validation/profile";

export function runRescueTests() {
  console.log("🧪 Running Scope Explosion Rescue Engine Unit Tests...");

  const profile: StudentProfileInput = {
    field: "Computer Science & AI",
    degree: "B.Tech CS 7th Sem",
    skills: ["Python", "React", "TypeScript", "FastAPI", "PyTorch"],
    interests: ["Healthcare AI"],
    experience: "intermediate",
    team_size: 3,
    timeline_months: 4,
    budget: "free",
    hardware: "standard_laptop",
    career_goal: "AI/ML Software Engineer",
    difficulty: "balanced_innovation",
  };

  const result = rescueProjectScope(profile, OVERAMBITIOUS_DEMO_PROJECT);

  // Test 1: Original score indicates Scope Explosion
  assert.strictEqual(result.originalScore.healthCategory, "SCOPE EXPLOSION DETECTED");

  // Test 2: Rescued score jump (e.g. 43 -> 75+)
  assert.ok(result.rescuedScore.overallScore > result.originalScore.overallScore);
  assert.notStrictEqual(result.rescuedScore.healthCategory, "SCOPE EXPLOSION DETECTED");

  // Test 3: Bloat features stripped
  assert.ok(result.strippedFeatures.length >= 3, "Must strip hardware, blockchain, and mobile apps");

  console.log("   ✅ 3/3 Rescue Engine tests passed!");
}
