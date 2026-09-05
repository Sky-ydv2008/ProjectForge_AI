/**
 * @file mentor-service.ts
 * @description Context-Aware AI Mentor Advisor Service supporting structured engineering responses.
 * @module MentorService
 */

import { StudentProfileInput } from "@/lib/validation/profile";
import { MentorMessage } from "@/lib/validation/mentor";
import { DEMO_MENTOR_RESPONSES, QUICK_ACTION_PROMPTS } from "./fixtures/mentor-fixtures";

/**
 * Formulates a context-aware mentor reply with Recommendation, Rationale, Implementation Steps, Risks, and Time-Limited Alternative.
 * 
 * @param {string} userMessage - Student's question string.
 * @param {StudentProfileInput} [profile] - Student profile object.
 * @param {string} [projectTitle] - Active project title.
 * @returns {Promise<MentorMessage>} Formatted mentor response object.
 */
export async function generateMentorResponse(
  userMessage: string,
  profile?: StudentProfileInput,
  projectTitle?: string
): Promise<MentorMessage> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;

  // Check if user message matches quick action prompt fixture
  const matchedPromptKey = Object.keys(DEMO_MENTOR_RESPONSES).find(
    (key) => key.toLowerCase() === userMessage.toLowerCase().trim()
  );

  if (matchedPromptKey && DEMO_MENTOR_RESPONSES[matchedPromptKey]) {
    const fixture = DEMO_MENTOR_RESPONSES[matchedPromptKey];
    return {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...fixture,
    };
  }

  // Fallback to default mentor response if Demo Mode or missing API key
  if (isDemoMode || !apiKey) {
    const defaultFixture = DEMO_MENTOR_RESPONSES[QUICK_ACTION_PROMPTS[0]];
    return {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...defaultFixture,
    };
  }

  // Attempt real LLM completion if key is present
  try {
    const systemPrompt = `You are ProjectForge AI Mentor, an expert academic project architect and software engineering advisor.
Respond to the student's question using this EXACT structured format:
1. content: Brief context answer
2. recommendation: 1-sentence action recommendation
3. why: Engineering rationale based on student skills and project constraints
4. implementationSteps: Array of 3-4 concrete step-by-step implementation actions
5. risks: Array of 1-2 potential risks and mitigations
6. timeLimitedAlternative: Alternative shortcut if deadline is compressed

Return ONLY a JSON object containing these keys.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
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
          { role: "user", content: `Student question: "${userMessage}". Profile: ${profile?.field}, Career: ${profile?.career_goal}. Project: ${projectTitle || 'Web SaaS'}` },
        ],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(raw);
      return {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: parsed.content || "Here is your project mentor advice:",
        recommendation: parsed.recommendation,
        why: parsed.why,
        implementationSteps: parsed.implementationSteps || [],
        risks: parsed.risks || [],
        timeLimitedAlternative: parsed.timeLimitedAlternative,
        createdAt: new Date().toISOString(),
      };
    }
  } catch (err: unknown) {
    console.error("❌ [Mentor Service Error]:", err);
  }

  const defaultFixture = DEMO_MENTOR_RESPONSES[QUICK_ACTION_PROMPTS[0]];
  return {
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...defaultFixture,
  };
}
