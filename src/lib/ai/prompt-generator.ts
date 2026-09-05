/**
 * @file prompt-generator.ts
 * @description Generates copyable, highly optimized AI Coding Prompts for external tools (ChatGPT, Claude, Cursor, v0, Bolt.new).
 * @module PromptGenerator
 */

import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { ProjectBlueprint } from "@/lib/validation/blueprint";

export interface AICodingPromptSuite {
  masterPrompt: string;
  frontendPrompt: string;
  backendPrompt: string;
  databasePrompt: string;
  unitTestPrompt: string;
}

/**
 * Generates copyable AI Coding Prompts tailored to student constraints and project blueprint.
 * @param {StudentProfileInput} profile - Student profile input object.
 * @param {AIProjectCandidate} [candidate] - Project candidate object.
 * @param {ProjectBlueprint} [blueprint] - Technical blueprint object.
 * @returns {AICodingPromptSuite} Suite of copyable AI coding prompts.
 */
export function generateAICodingPrompts(
  profile: StudentProfileInput,
  candidate?: AIProjectCandidate,
  blueprint?: ProjectBlueprint
): AICodingPromptSuite {
  const title = candidate?.title || blueprint?.projectTitle || "Rescued MVP Project";
  const problem = candidate?.problem || blueprint?.overview.problemStatement || "Domain workflow optimization";
  const solution = candidate?.solution || blueprint?.overview.solutionSummary || "Full-stack web application with analytics";
  const skills = profile.skills.join(", ");
  const primarySkill = profile.skills[0] || "Python";
  const secondarySkill = profile.skills[1] || "React";

  const masterPrompt = `You are a senior full-stack software architect. I need you to write clean, production-quality code for my project: "${title}".

PROJECT CONTEXT:
- Problem: ${problem}
- Solution: ${solution}
- Target Role: ${profile.career_goal}
- Technologies: ${skills}
- Target Architecture: Next.js 14 App Router, ${primarySkill}, ${secondarySkill}, Supabase PostgreSQL with RLS.

INSTRUCTIONS:
1. Provide modular, production-ready code with complete type definitions.
2. Implement strict input validation using Zod.
3. Enforce clean error handling with try/catch and HTTP status codes.
4. Keep the code simple, clean, and well-commented.`;

  const frontendPrompt = `You are a senior frontend engineer specializing in Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS.

TASK:
Write the complete frontend UI dashboard component for "${title}".

REQUIREMENTS:
- Use React functional components with TypeScript interfaces.
- Apply modern, dark-themed Tailwind CSS styling (#07090e dark background, slate borders #1e293b, cyan accents #38bdf8).
- Include interactive metric cards, charts/gauges, status badges, and loading states.
- Ensure 100% WAI-ARIA accessibility (aria-label, role attributes, focus rings).
- Primary Tech: ${secondarySkill}, Next.js App Router, Lucide React Icons.`;

  const backendPrompt = `You are a senior backend engineer specializing in ${primarySkill}, REST APIs, and micro-services.

TASK:
Write the REST API route handlers for "${title}".

REQUIREMENTS:
- Implement endpoints for data ingestion, analytics calculation, and status reporting.
- Use Zod schemas to validate 100% of incoming JSON request payloads.
- Implement error handling with clear error messages and status codes (200, 400, 500).
- Sanitize inputs to prevent XSS and injection attacks.
- Technologies: ${primarySkill}, REST APIs, PostgreSQL.`;

  const databasePrompt = `You are a PostgreSQL database architect.

TASK:
Write the complete PostgreSQL SQL schema migration script and Supabase Row Level Security (RLS) policies for "${title}".

REQUIREMENTS:
1. Create normalized relational tables: student_profiles, projects, features, predictions.
2. Include UUID primary keys, foreign key constraints, timestamps, and column data types.
3. Enable Row Level Security on ALL tables: ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
4. Create explicit RLS isolation policies: CREATE POLICY "Users access own records" ON <table_name> FOR ALL USING (auth.uid() = user_id);`;

  const unitTestPrompt = `You are a Lead QA Automation Engineer.

TASK:
Write automated unit and integration tests for "${title}".

REQUIREMENTS:
- Test Zod payload schema validation for edge cases and invalid inputs.
- Test API route handlers for success (200 OK) and validation error (400 Bad Request) responses.
- Test core calculation logic and state management.
- Frame tests using standard assertion libraries with 100% pass expectations.`;

  return {
    masterPrompt,
    frontendPrompt,
    backendPrompt,
    databasePrompt,
    unitTestPrompt,
  };
}
