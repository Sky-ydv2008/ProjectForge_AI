/**
 * @file roadmap-service.ts
 * @description Phased Build Roadmap & Task Tracker Generation Service.
 * @module RoadmapService
 */

import { StudentProfileInput } from "@/lib/validation/profile";
import { projectRoadmapSchema, ProjectRoadmap } from "@/lib/validation/roadmap";
import { DEMO_PROJECT_ROADMAP } from "./fixtures/roadmap-fixtures";

/**
 * Generates a 4-phase, 12-task build roadmap tailored to student team size and timeline.
 * 
 * @param {StudentProfileInput} profile - Validated student profile input object.
 * @param {string} [projectTitle] - Optional project title.
 * @returns {Promise<ProjectRoadmap>} Phased build roadmap containing tasks and status.
 */
export async function generateProjectRoadmap(
  profile: StudentProfileInput,
  projectTitle?: string
): Promise<ProjectRoadmap> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;

  if (isDemoMode || !apiKey) {
    console.log("ℹ️ [Roadmap Service] Returning deterministic demo roadmap fixture.");
    if (projectTitle) {
      return {
        ...DEMO_PROJECT_ROADMAP,
        projectTitle,
      };
    }
    return DEMO_PROJECT_ROADMAP;
  }

  try {
    const prompt = `Generate a 4-phase, 12-task build roadmap JSON for project "${projectTitle || 'Web App'}" tailored for a ${profile.team_size}-person team with a ${profile.timeline_months}-month timeline.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(raw);
      const validation = projectRoadmapSchema.safeParse(parsed);
      if (validation.success) {
        return validation.data;
      }
    }
  } catch (err: unknown) {
    console.error("❌ [Roadmap Service Error]:", err);
  }

  return DEMO_PROJECT_ROADMAP;
}
