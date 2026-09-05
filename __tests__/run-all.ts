/**
 * @file run-all.ts
 * @description Master Test Runner for ProjectForge AI Automated Test Suite.
 */

import { runScoringTests } from "./scoring.test";
import { runValidationTests } from "./validation.test";
import { runRescueTests } from "./rescue.test";

function main() {
  console.log("=================================================");
  console.log("🧪 ProjectForge AI Master Automated Test Suite");
  console.log("   Evaluated for Hack2Skill AI Code Submission");
  console.log("=================================================\n");

  try {
    runScoringTests();
    runValidationTests();
    runRescueTests();

    console.log("\n------------------------------------------------");
    console.log("🎉 ALL TEST SUITES PASSED 100% WITH ZERO FAILURES!");
    console.log("=================================================\n");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`\n❌ TEST SUITE RUNNER FAILED: ${msg}`);
    process.exit(1);
  }
}

main();
