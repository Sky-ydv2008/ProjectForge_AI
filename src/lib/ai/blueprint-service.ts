/**
 * @file blueprint-service.ts
 * @description Technical Architecture Blueprint Generation Service supporting Google Gemini API & OpenAI.
 * @module BlueprintService
 */

import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { projectBlueprintSchema, ProjectBlueprint } from "@/lib/validation/blueprint";
import { DEMO_PROJECT_BLUEPRINT } from "./fixtures/blueprint-fixtures";
import { callGeminiApi } from "./gemini-client";

/**
 * Generates a complete 8-tab technical architecture blueprint tailored to student constraints or custom problem statements.
 * 
 * @param {StudentProfileInput} profile - Validated student profile input object.
 * @param {AIProjectCandidate} [candidate] - Optional project candidate object.
 * @param {string} [customProblemStatement] - Optional user-defined custom problem statement.
 * @returns {Promise<ProjectBlueprint>} Complete 8-tab technical architecture blueprint.
 */
export async function generateTechnicalBlueprint(
  profile: StudentProfileInput,
  candidate?: AIProjectCandidate,
  customProblemStatement?: string
): Promise<ProjectBlueprint> {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const problemText = customProblemStatement?.trim() || candidate?.problem || "Clinical risk prediction for hospital patients";
  const titleText = customProblemStatement
    ? `Custom Project: ${customProblemStatement.substring(0, 45)}...`
    : candidate?.title || "MedForge AI — Clinical Diagnostic Platform";

  const systemInstruction = `You are an expert academic project architect. Generate a complete 8-tab technical architecture blueprint JSON for problem statement: "${problemText}". Student profile skills: ${profile.skills.join(", ")}, field: ${profile.field}, timeline: ${profile.timeline_months} months.`;

  // Priority 1: Google Gemini API
  if (geminiApiKey && !isDemoMode) {
    try {
      console.log(`🤖 [Blueprint Service] Calling Gemini API for blueprint...`);
      const rawText = await callGeminiApi(systemInstruction, problemText, geminiApiKey);
      const parsed = JSON.parse(rawText);
      const validation = projectBlueprintSchema.safeParse(parsed);
      if (validation.success) {
        return validation.data;
      }
    } catch (err: unknown) {
      console.error("❌ [Gemini Blueprint Error]:", err);
    }
  }

  // Priority 2: OpenAI API
  if (openaiApiKey && !isDemoMode) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [{ role: "user", content: systemInstruction }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const raw = data.choices?.[0]?.message?.content || "";
        const parsed = JSON.parse(raw);
        const validation = projectBlueprintSchema.safeParse(parsed);
        if (validation.success) {
          return validation.data;
        }
      }
    } catch (err: unknown) {
      console.error("❌ [OpenAI Blueprint Error]:", err);
    }
  }

  return {
    ...DEMO_PROJECT_BLUEPRINT,
    projectTitle: titleText,
    overview: {
      ...DEMO_PROJECT_BLUEPRINT.overview,
      problemStatement: problemText,
      solutionSummary: customProblemStatement 
        ? `A tailored application and backend service designed to solve: "${problemText}" using ${profile.skills.join(", ")}.`
        : DEMO_PROJECT_BLUEPRINT.overview.solutionSummary,
    },
  };
}
