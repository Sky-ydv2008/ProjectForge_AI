import assert from "assert";
import { studentProfileSchema, StudentProfileInput } from "../src/lib/validation/profile";
import { calculateDeterministicHealthScore } from "../src/lib/scoring/engine";
import { rescueProjectScope, OVERAMBITIOUS_DEMO_PROJECT } from "../src/lib/scoring/rescue-engine";
import { buildDynamicCandidatesFromSkills } from "../src/lib/ai/service";

async function runTestSuite() {
  console.log("=================================================");
  console.log("🧪 ProjectForge AI Automated Test Suite");
  console.log("   Evaluated for Hack2Skill AI Code Submission");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function test(name: string, fn: () => void) {
    try {
      fn();
      passed++;
      console.log(`✅ PASS: ${name}`);
    } catch (err: unknown) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ FAIL: ${name}\n   Error: ${msg}`);
    }
  }

  const sampleProfile: StudentProfileInput = {
    field: "Computer Science & AI",
    degree: "B.Tech CS 7th Sem",
    skills: ["Python", "React", "TypeScript", "FastAPI", "PyTorch"],
    interests: ["Healthcare AI", "Predictive Analytics"],
    experience: "intermediate",
    team_size: 3,
    timeline_months: 4,
    budget: "free",
    hardware: "standard_laptop",
    career_goal: "AI/ML Software Engineer",
    difficulty: "balanced_innovation",
  };

  // Test 1: Student Profile Zod Schema
  test("1. Student Profile Zod Validation", () => {
    const res = studentProfileSchema.safeParse(sampleProfile);
    assert.strictEqual(res.success, true, "Profile validation should pass");
    assert.strictEqual(res.data?.skills.length, 5, "Should have 5 skills");
  });

  // Test 2: Dynamic Candidate Generation
  test("2. Skill-Driven Dynamic Candidate Generation", () => {
    const candidates = buildDynamicCandidatesFromSkills(sampleProfile);
    assert.strictEqual(candidates.length, 8, "Should generate 8 distinct candidates");
    assert.ok(candidates[0].title.includes("Python"), "First candidate title should feature Python");
  });

  // Test 3: Deterministic Scoring Engine Math
  test("3. Deterministic 6-Factor Health Scoring Engine", () => {
    const candidates = buildDynamicCandidatesFromSkills(sampleProfile);
    const score = calculateDeterministicHealthScore(sampleProfile, candidates[0]);
    assert.ok(score.overallScore >= 0 && score.overallScore <= 100, "Score must be between 0 and 100");
    assert.strictEqual(score.dimensions.skillFit.weight, 0.25, "Skill Fit weight must be 25%");
    assert.strictEqual(score.dimensions.feasibility.weight, 0.20, "Feasibility weight must be 20%");
  });

  // Test 4: Scope Explosion Detection & AI Rescue
  test("4. Scope Explosion Detection & AI Rescue (43 -> 86)", () => {
    const rescueResult = rescueProjectScope(sampleProfile, OVERAMBITIOUS_DEMO_PROJECT);
    assert.strictEqual(rescueResult.originalScore.healthCategory, "SCOPE EXPLOSION DETECTED", "Original score should be Scope Explosion");
    assert.ok(rescueResult.rescuedScore.overallScore > rescueResult.originalScore.overallScore, "Rescued score should be higher");
    assert.ok(rescueResult.strippedFeatures.length >= 2, "Should strip bloat features");
  });

  // Test 5: Java Skill Reordering Logic
  test("5. Career Goal Skill Prioritization (Java)", () => {
    const javaProfile: StudentProfileInput = {
      ...sampleProfile,
      skills: ["Python", "Java", "Spring Boot", "MySQL"],
      career_goal: "Java Backend Engineer",
    };
    const javaCandidates = buildDynamicCandidatesFromSkills(javaProfile);
    assert.ok(javaCandidates[0].title.includes("Java"), "Java candidate should be prioritized for Java career goal");
  });

  console.log("\n------------------------------------------------");
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite();
