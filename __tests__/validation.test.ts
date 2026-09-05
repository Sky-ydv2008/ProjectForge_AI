/**
 * @file validation.test.ts
 * @description Unit tests for Zod schema validation models.
 */

import assert from "assert";
import { studentProfileSchema } from "../src/lib/validation/profile";
import { aiProjectCandidateSchema } from "../src/lib/validation/ai-generation";
import { projectBlueprintSchema } from "../src/lib/validation/blueprint";
import { publishRepoConfigSchema } from "../src/lib/validation/publish";

export function runValidationTests() {
  console.log("🧪 Running Zod Schema Validation Unit Tests...");

  // Test 1: Student Profile Schema
  const validProfile = {
    field: "Computer Science",
    degree: "B.Tech CS 7th Sem",
    skills: ["Java", "Spring Boot", "MySQL"],
    interests: ["Enterprise SaaS"],
    experience: "intermediate",
    team_size: 3,
    timeline_months: 4,
    budget: "free",
    hardware: "standard_laptop",
    career_goal: "Backend Engineer",
    difficulty: "balanced_innovation",
  };
  const profileRes = studentProfileSchema.safeParse(validProfile);
  assert.strictEqual(profileRes.success, true);

  // Test 2: Invalid profile rejection
  const invalidProfile = { ...validProfile, skills: [] };
  const invalidRes = studentProfileSchema.safeParse(invalidProfile);
  assert.strictEqual(invalidRes.success, false, "Should reject empty skills list");

  // Test 3: Repository Config Schema
  const validRepoConfig = {
    repositoryName: "projectforge-ai",
    description: "AI Project Architect",
    isPrivate: false,
    framework: "nextjs",
    buildCommand: "npm run build",
    outputDirectory: ".next",
  };
  const repoRes = publishRepoConfigSchema.safeParse(validRepoConfig);
  assert.strictEqual(repoRes.success, true);

  console.log("   ✅ 3/3 Validation Schema tests passed!");
}
