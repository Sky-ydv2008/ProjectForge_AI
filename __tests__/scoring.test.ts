/**
 * @file scoring.test.ts
 * @description Unit tests for the Deterministic 6-Factor Health Scoring Engine.
 */

import assert from "assert";
import { calculateDeterministicHealthScore } from "../src/lib/scoring/engine";
import { StudentProfileInput } from "../src/lib/validation/profile";
import { AIProjectCandidate } from "../src/lib/validation/ai-generation";

export function runScoringTests() {
  console.log("🧪 Running Scoring Engine Unit Tests...");

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

  const candidate: AIProjectCandidate = {
    id: "cand-test-01",
    title: "Python Healthcare AI Platform",
    summary: "Test candidate project",
    problem: "Test problem",
    solution: "Test solution",
    target_users: ["Doctors"],
    required_skills: ["Python", "React"],
    technologies: ["Python", "React", "FastAPI"],
    complexity: 5,
    features: [
      { name: "Core Engine", description: "Backend core", priority: "MUST HAVE", estimated_days: 3 },
      { name: "UI Dashboard", description: "Frontend UI", priority: "MUST HAVE", estimated_days: 3 },
    ],
    optional_features: [],
    risks: [{ risk: "Data seeding", severity: "low", probability: "low", impact: "Low", mitigation: "Mock data" }],
    skill_gaps: [],
    demo_flow: ["Launch UI", "Upload CSV", "View score"],
    innovation_opportunities: [],
  };

  // Test 1: Valid score range
  const result = calculateDeterministicHealthScore(profile, candidate);
  assert.ok(result.overallScore >= 0 && result.overallScore <= 100, "Overall score must be 0-100");
  assert.strictEqual(result.healthCategory, "FEASIBLE MVP", "Should classify as FEASIBLE MVP");

  // Test 2: Weight verification
  assert.strictEqual(result.dimensions.skillFit.weight, 0.25);
  assert.strictEqual(result.dimensions.feasibility.weight, 0.20);
  assert.strictEqual(result.dimensions.innovation.weight, 0.20);
  assert.strictEqual(result.dimensions.careerValue.weight, 0.15);
  assert.strictEqual(result.dimensions.demoPotential.weight, 0.10);
  assert.strictEqual(result.dimensions.riskAdjustment.weight, 0.10);

  // Test 3: Scope explosion classification
  const bloatedCandidate: AIProjectCandidate = {
    ...candidate,
    complexity: 10,
    features: [
      { name: "Hardware", description: "Hardware", priority: "REMOVE", estimated_days: 14 },
      { name: "Blockchain", description: "Blockchain", priority: "REMOVE", estimated_days: 12 },
      { name: "Mobile", description: "Mobile", priority: "REMOVE", estimated_days: 15 },
      { name: "Model", description: "Model", priority: "MUST HAVE", estimated_days: 4 },
      { name: "Dashboard", description: "Dashboard", priority: "MUST HAVE", estimated_days: 3 },
    ],
  };

  const bloatedResult = calculateDeterministicHealthScore(profile, bloatedCandidate);
  assert.strictEqual(bloatedResult.healthCategory, "SCOPE EXPLOSION DETECTED");
  assert.strictEqual(bloatedResult.colorTheme, "danger");

  console.log("   ✅ 3/3 Scoring Engine tests passed!");
}
