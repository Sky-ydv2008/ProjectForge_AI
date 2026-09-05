import { StudentProfileInput } from "@/lib/validation/profile";
import { aiGenerationOutputSchema, AIGenerationOutput, AIProjectCandidate } from "@/lib/validation/ai-generation";
import { callGeminiApi } from "./gemini-client";

/**
 * Dynamically generates candidate projects matching student's actual selected skills and constraints.
 */
export function buildDynamicCandidatesFromSkills(profile: StudentProfileInput): AIProjectCandidate[] {
  const skills = profile.skills.length > 0 ? profile.skills : ["Python", "React", "TypeScript"];
  const primarySkill = skills[0];
  const secondarySkill = skills[1] || skills[0];
  const tertiarySkill = skills[2] || skills[0];
  const career = profile.career_goal || "Software Engineer";
  const domain = profile.interests[0] || "Software Engineering";

  // Project 1: Primary Feasible MVP built around student's primary skills
  const proj1: AIProjectCandidate = {
    id: `proj-${primarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-001`,
    title: `${primarySkill} & ${secondarySkill} Smart ${domain} Platform`,
    summary: `A high-feasibility MVP application built specifically using ${primarySkill} and ${secondarySkill} tailored for ${career} roles.`,
    problem: `Students and organizations in ${profile.field} lack automated workflow tools and real-time telemetry analytics for ${domain}.`,
    solution: `An automated ${primarySkill}-based core processing engine with a responsive ${secondarySkill} dashboard providing live metrics and reporting.`,
    target_users: [`${career} Candidates`, "Technical Assessors", "Domain Managers"],
    required_skills: [primarySkill, secondarySkill],
    technologies: skills.slice(0, 5),
    complexity: 5,
    features: [
      { name: `Core ${primarySkill} Processing Engine`, description: `Service backend built with ${primarySkill} processing input data streams`, priority: "MUST HAVE", estimated_days: 3 },
      { name: `${secondarySkill} Interactive Dashboard`, description: `Web interface rendering data visualization, status flags, and user controls`, priority: "MUST HAVE", estimated_days: 3 },
      { name: "Automated Data Export & Reports", description: "Export evaluation telemetry reports to CSV and JSON formats", priority: "SHOULD HAVE", estimated_days: 2 },
    ],
    optional_features: ["Dark theme UI", "Custom notification preferences"],
    risks: [
      { risk: "Initial sample dataset seeding delay", severity: "low", probability: "low", impact: "Low", mitigation: "Use synthetic CSV/JSON data stream" }
    ],
    skill_gaps: [],
    demo_flow: [
      `Launch ${secondarySkill} web dashboard interface`,
      `Submit sample data payload to ${primarySkill} backend service`,
      "Observe real-time metric gauges update on dashboard"
    ],
    innovation_opportunities: [`Optimized ${primarySkill} processing pipeline`]
  };

  // Project 2: Secondary Skill Domain Project
  const proj2: AIProjectCandidate = {
    id: `proj-${tertiarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-002`,
    title: `${tertiarySkill} Automated Quality & Intelligence Assessor`,
    summary: `A specialized developer tool and analysis platform built using ${tertiarySkill} and ${primarySkill} for ${career} applicants.`,
    problem: `Manual verification of ${domain} data streams is slow and subject to evaluation errors.`,
    solution: `An intelligent analysis pipeline using ${tertiarySkill} to parse incoming data and generate instant radar metrics.`,
    target_users: ["Technical Lead Evaluators", "Data Analysts", "Engineering Managers"],
    required_skills: [tertiarySkill, primarySkill],
    technologies: Array.from(new Set([tertiarySkill, primarySkill, secondarySkill, "SQL"])),
    complexity: 6,
    features: [
      { name: `${tertiarySkill} Static Analysis Module`, description: `Parses incoming data streams to compute performance metrics`, priority: "MUST HAVE", estimated_days: 4 },
      { name: "Summary Report Generator", description: "Generates formatted PDF/JSON evaluation summaries", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Interactive Metric Radar Graphs", description: "Spider chart displaying multi-dimensional technical ratings", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Historical log archiving"],
    risks: [
      { risk: "Parsing latency on large input datasets", severity: "medium", probability: "low", impact: "Medium", mitigation: "Implement batch processing" }
    ],
    skill_gaps: [],
    demo_flow: [
      "Upload input dataset",
      `Trigger ${tertiarySkill} analysis pipeline`,
      "Inspect radar score charts and summary report"
    ],
    innovation_opportunities: [`Automated ${tertiarySkill} insights`]
  };

  // Project 3: Overambitious Bloated Candidate (Trigger for Scope Explosion Rescue)
  const proj3: AIProjectCandidate = {
    id: `proj-bloated-003`,
    title: `${primarySkill} ${domain} System + Blockchain Privacy + Custom Microcontroller Hardware + Dual Native Mobile Apps`,
    summary: `An overambitious candidate combining ${primarySkill}, custom IoT hardware, Ethereum smart contracts, and dual native mobile apps.`,
    problem: `Extremely complex multi-domain requirements causing hardware soldering dependencies and deadline failure.`,
    solution: `Overkill architecture featuring physical hardware sensors, blockchain logging, dual native mobile apps, and ${primarySkill} models.`,
    target_users: ["System Administrators", "Field Technicians"],
    required_skills: [primarySkill, "Solidity", "Swift/iOS", "Embedded C++"],
    technologies: [primarySkill, "Ethereum", "Custom IoT Microcontroller", "Swift", "Kotlin", secondarySkill],
    complexity: 10,
    features: [
      { name: "Custom Microcontroller IoT Sensor Board", description: "Hardware sensor requiring physical soldering and embedded debugging", priority: "REMOVE", estimated_days: 14 },
      { name: "Ethereum Smart Contracts for Data Audit", description: "Solidity smart contracts logging transactions on blockchain", priority: "REMOVE", estimated_days: 12 },
      { name: "Native iOS & Android Mobile Applications", description: "Dual native mobile apps for phone alerts", priority: "REMOVE", estimated_days: 15 },
      { name: `Core ${primarySkill} Prediction Engine`, description: `Analytical model processing domain inputs`, priority: "MUST HAVE", estimated_days: 4 },
      { name: `Next.js / ${secondarySkill} Web Dashboard`, description: "Web UI displaying real-time diagnostic status", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Simulated Data Generator", description: "Mock JSON stream replacing physical hardware board", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["PDF report export"],
    risks: [
      { risk: "Microcontroller hardware defect or soldering failure", severity: "high", probability: "high", impact: "Total Project Blocker", mitigation: "Remove hardware requirement" },
      { risk: "Blockchain gas fee latency", severity: "high", probability: "high", impact: "High", mitigation: "Remove blockchain requirement" }
    ],
    skill_gaps: ["Solidity", "Swift/iOS", "Embedded Hardware"],
    demo_flow: [
      "Show custom hardware board",
      "Show blockchain log",
      "Show native mobile alert"
    ],
    innovation_opportunities: ["Rescope bloat into clean web MVP"]
  };

  return [proj1, proj2, proj3];
}

/**
 * Server-Side AI Generation Service supporting Google Gemini API, OpenAI, Groq, and Dynamic Skill Generation.
 */
export async function generateProjectCandidates(
  profile: StudentProfileInput
): Promise<AIGenerationOutput> {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const dynamicCandidates = buildDynamicCandidatesFromSkills(profile);

  const systemPrompt = `You are an expert academic project architect.
Given a student's selected programming languages and skills: [${profile.skills.join(", ")}], field of study: "${profile.field}", and target career goal: "${profile.career_goal}", generate 3 structured project candidates tailored EXACTLY to their skills.

CRITICAL INSTRUCTIONS:
1. Candidate technologies MUST include their declared skills: ${profile.skills.join(", ")}.
2. Project 1 must be a highly buildable MVP.
3. Project 2 must be an analytical developer tool.
4. Project 3 must be an overambitious candidate combining their skills with hardware/blockchain/mobile bloat (marked REMOVE) to trigger Scope Explosion Rescue.
5. Return ONLY a valid JSON object matching: { "projects": [...] }`;

  const userPrompt = `Student Profile:
- Selected Skills: ${profile.skills.join(", ")}
- Field: ${profile.field} (${profile.degree})
- Career Goal: ${profile.career_goal}
- Team Size: ${profile.team_size} members
- Timeline: ${profile.timeline_months} months
- Experience: ${profile.experience}`;

  // Priority 1: Call Google Gemini API if GEMINI_API_KEY is configured
  if (geminiApiKey && !isDemoMode) {
    try {
      console.log(`🤖 [AI Service] Invoking Google Gemini API for skills: ${profile.skills.join(", ")}`);
      const rawText = await callGeminiApi(systemPrompt, userPrompt, geminiApiKey);
      const parsedJson = JSON.parse(rawText);
      const validation = aiGenerationOutputSchema.safeParse(parsedJson);
      if (validation.success) {
        return validation.data;
      }
      console.warn("⚠️ [Gemini API] Zod schema validation failed. Using skill-tailored candidate engine.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("❌ [Gemini API Error]:", msg);
    }
  }

  // Priority 2: Call OpenAI / Groq API if OPENAI_API_KEY is configured
  if (openaiApiKey && !isDemoMode) {
    try {
      console.log(`🤖 [AI Service] Invoking OpenAI API for skills: ${profile.skills.join(", ")}`);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
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

      if (response.ok) {
        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content || "";
        const parsedJson = JSON.parse(rawContent);
        const validation = aiGenerationOutputSchema.safeParse(parsedJson);
        if (validation.success) {
          return validation.data;
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("❌ [OpenAI API Error]:", msg);
    }
  }

  // Priority 3: Use Dynamic Candidate Generator built from student's input skills
  console.log(`ℹ️ [AI Service] Generating dynamic candidate projects based on student skills: ${profile.skills.join(", ")}`);
  return { projects: dynamicCandidates };
}
