import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { projectBlueprintSchema, ProjectBlueprint } from "@/lib/validation/blueprint";
import { DEMO_PROJECT_BLUEPRINT } from "./fixtures/blueprint-fixtures";

export async function generateTechnicalBlueprint(
  profile: StudentProfileInput,
  candidate?: AIProjectCandidate
): Promise<ProjectBlueprint> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;

  if (isDemoMode || !apiKey) {
    console.log("ℹ️ [Blueprint Service] Returning deterministic demo blueprint fixture.");
    if (candidate) {
      return {
        ...DEMO_PROJECT_BLUEPRINT,
        projectTitle: candidate.title,
        overview: {
          ...DEMO_PROJECT_BLUEPRINT.overview,
          problemStatement: candidate.problem,
          solutionSummary: candidate.solution,
        },
      };
    }
    return DEMO_PROJECT_BLUEPRINT;
  }

  // Attempt real LLM generation if key is present
  try {
    const prompt = `Generate a complete 8-tab technical architecture blueprint JSON for project "${candidate?.title || 'Web SaaS'}" for a student with profile: ${profile.field}, skills: ${profile.skills.join(", ")}, timeline: ${profile.timeline_months} months.`;

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
      const validation = projectBlueprintSchema.safeParse(parsed);
      if (validation.success) {
        return validation.data;
      }
    }
  } catch (err: unknown) {
    console.error("❌ [Blueprint Service Error]:", err);
  }

  return DEMO_PROJECT_BLUEPRINT;
}
