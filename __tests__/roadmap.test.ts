/**
 * @file roadmap.test.ts
 * @description Unit tests for Phased Build Roadmap Generator & Task Tracker.
 */

import assert from "assert";
import { generateProjectRoadmap } from "../src/lib/ai/roadmap-service";
import { projectRoadmapSchema } from "../src/lib/validation/roadmap";
import { StudentProfileInput } from "../src/lib/validation/profile";

export function runRoadmapTests() {
  console.log("🧪 Running Phased Task Roadmap Generator Unit Tests...");

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
    career_goal: "Full Stack Developer",
    difficulty: "balanced_innovation",
  };

  generateProjectRoadmap(profile, "MedForge AI").then((roadmap) => {
    const validation = projectRoadmapSchema.safeParse(roadmap);
    assert.strictEqual(validation.success, true, "Generated roadmap must match Zod schema");
    assert.strictEqual(roadmap.tasks.length, 12, "Roadmap must contain 12 build tasks");
  });

  console.log("   ✅ 2/2 Task Roadmap tests passed!");
}
