import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { projectBlueprintSchema, ProjectBlueprint } from "@/lib/validation/blueprint";
import { DEMO_PROJECT_BLUEPRINT } from "./fixtures/blueprint-fixtures";

export async function generateTechnicalBlueprint(
  profile: StudentProfileInput,
  candidate?: AIProjectCandidate,
  customProblemStatement?: string
): Promise<ProjectBlueprint> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;

  const problemText = customProblemStatement?.trim() || candidate?.problem || "Clinical risk prediction for hospital patients";
  const titleText = customProblemStatement
    ? `Custom Project: ${customProblemStatement.substring(0, 45)}...`
    : candidate?.title || "MedForge AI — Clinical Diagnostic Platform";

  // If in Demo Mode or no API key, customize fixture to custom problem statement
  if (isDemoMode || !apiKey) {
    console.log("ℹ️ [Blueprint Service] Customizing blueprint fixture to problem statement.");
    
    return {
      ...DEMO_PROJECT_BLUEPRINT,
      projectTitle: titleText,
      overview: {
        ...DEMO_PROJECT_BLUEPRINT.overview,
        problemStatement: problemText,
        solutionSummary: customProblemStatement 
          ? `A tailored web application and backend service designed to solve: "${problemText}".`
          : DEMO_PROJECT_BLUEPRINT.overview.solutionSummary,
      },
    };
  }

  // Attempt real LLM generation if key is present
  try {
    const prompt = `Generate a complete 8-tab technical architecture blueprint JSON for problem statement: "${problemText}". Student profile: Field: ${profile.field}, Skills: ${profile.skills.join(", ")}, Timeline: ${profile.timeline_months} months.`;

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

  return {
    ...DEMO_PROJECT_BLUEPRINT,
    projectTitle: titleText,
    overview: {
      ...DEMO_PROJECT_BLUEPRINT.overview,
      problemStatement: problemText,
    },
  };
}
