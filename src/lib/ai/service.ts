import { StudentProfileInput } from "@/lib/validation/profile";
import { aiGenerationOutputSchema, AIGenerationOutput, AIProjectCandidate } from "@/lib/validation/ai-generation";
import { DEMO_PROJECT_CANDIDATES } from "./fixtures/generation-fixtures";

/**
 * Server-Side AI Generation Service with Zod Validation, 1-Retry Policy, and Graceful Demo Fallback.
 */
export async function generateProjectCandidates(
  profile: StudentProfileInput
): Promise<AIGenerationOutput> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;

  // Fallback to deterministic demo fixtures if in Demo Mode or missing API key
  if (isDemoMode || !apiKey) {
    console.log("ℹ️ [AI Service] Returning deterministic demo candidate fixtures (Demo Mode / No API key).");
    return { projects: DEMO_PROJECT_CANDIDATES };
  }

  // Construct structured system prompt
  const systemPrompt = `You are an expert academic project architect and software mentor.
Given a student's profile and constraints, generate 3 structured, highly realistic project candidates tailored to their exact skills, team size, timeline, and career goals.

CRITICAL INSTRUCTIONS:
1. Optimize for realistic scope within the student's timeline (${profile.timeline_months} months) and team size (${profile.team_size} members).
2. Use their declared skills (${profile.skills.join(", ")}) and target role (${profile.career_goal}).
3. Categorize features as MUST HAVE, SHOULD HAVE, COULD HAVE, or REMOVE.
4. Do NOT invent fake stats, datasets, or APIs without noting real alternatives.
5. Return ONLY a valid JSON object matching the JSON Schema below. No markdown text outside JSON.

JSON SCHEMA:
{
  "projects": [
    {
      "id": "unique-slug-string",
      "title": "string",
      "summary": "string",
      "problem": "string",
      "solution": "string",
      "target_users": ["string"],
      "required_skills": ["string"],
      "technologies": ["string"],
      "complexity": 1-10,
      "features": [
        { "name": "string", "description": "string", "priority": "MUST HAVE"|"SHOULD HAVE"|"COULD HAVE"|"REMOVE", "estimated_days": number }
      ],
      "optional_features": ["string"],
      "risks": [
        { "risk": "string", "severity": "low"|"medium"|"high", "probability": "low"|"medium"|"high", "impact": "string", "mitigation": "string" }
      ],
      "skill_gaps": ["string"],
      "demo_flow": ["string"],
      "innovation_opportunities": ["string"]
    }
  ]
}`;

  const userPrompt = `Student Profile Constraints:
- Field: ${profile.field} (${profile.degree})
- Skills: ${profile.skills.join(", ")}
- Interests: ${profile.interests.join(", ")}
- Experience: ${profile.experience}
- Team Size: ${profile.team_size} members
- Timeline: ${profile.timeline_months} months
- Budget: ${profile.budget}
- Hardware: ${profile.hardware}
- Career Goal: ${profile.career_goal}
- Difficulty Preference: ${profile.difficulty}`;

  // Attempt 1: Call LLM endpoint
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
    const parsedJson = JSON.parse(rawContent);

    // Zod validation Attempt 1
    const validation = aiGenerationOutputSchema.safeParse(parsedJson);
    if (validation.success) {
      return validation.data;
    }

    console.warn("⚠️ [AI Service] Attempt 1 Zod validation failed. Retrying once with error feedback...");

    // Attempt 2: Retry with explicit Zod error feedback
    const retryResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
          { role: "assistant", content: rawContent },
          { role: "user", content: `Your JSON had schema errors: ${validation.error.message}. Please fix and return exact valid JSON matching the schema.` },
        ],
      }),
    });

    if (retryResponse.ok) {
      const retryData = await retryResponse.json();
      const retryContent = retryData.choices?.[0]?.message?.content || "";
      const retryJson = JSON.parse(retryContent);
      const retryValidation = aiGenerationOutputSchema.safeParse(retryJson);
      if (retryValidation.success) {
        return retryValidation.data;
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ [AI Service Error]:", msg);
  }

  // Graceful Fallback if LLM / retry fails
  console.log("ℹ️ [AI Service] Falling back to deterministic candidate fixtures after API failure.");
  return { projects: DEMO_PROJECT_CANDIDATES };
}
