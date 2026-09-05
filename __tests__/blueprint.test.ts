/**
 * @file blueprint.test.ts
 * @description Unit tests for Technical Architecture Blueprint Generator.
 */

import assert from "assert";
import { generateTechnicalBlueprint } from "../src/lib/ai/blueprint-service";
import { projectBlueprintSchema } from "../src/lib/validation/blueprint";
import { StudentProfileInput } from "../src/lib/validation/profile";

export function runBlueprintTests() {
  console.log("🧪 Running Technical Blueprint Generator Unit Tests...");

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
    career_goal: "AI Engineer",
    difficulty: "balanced_innovation",
  };

  // Test 1: Blueprint generation schema validity
  generateTechnicalBlueprint(profile, undefined, "AWS Security Log Analyzer").then((blueprint) => {
    const validation = projectBlueprintSchema.safeParse(blueprint);
    assert.strictEqual(validation.success, true, "Generated blueprint must match Zod schema");
    assert.ok(blueprint.overview.problemStatement.length > 0, "Problem statement must be populated");
    assert.ok(blueprint.databaseDesign.length >= 3, "Database design must have at least 3 tables");
    assert.ok(blueprint.apiEndpoints.length >= 3, "API design must have at least 3 endpoints");
  });

  console.log("   ✅ 3/3 Blueprint Generator tests passed!");
}
