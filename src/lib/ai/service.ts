import { StudentProfileInput } from "@/lib/validation/profile";
import { aiGenerationOutputSchema, AIGenerationOutput, AIProjectCandidate } from "@/lib/validation/ai-generation";

/**
 * Dynamically generates 3 candidate projects matching student's actual selected skills and constraints.
 */
export function buildDynamicCandidatesFromSkills(profile: StudentProfileInput): AIProjectCandidate[] {
  const skills = profile.skills.length > 0 ? profile.skills : ["Python", "React", "TypeScript"];
  const primarySkill = skills[0];
  const secondarySkill = skills[1] || skills[0];
  const tertiarySkill = skills[2] || skills[0];
  const career = profile.career_goal || "Software Engineer";

  // Project 1: Primary Feasible MVP built around primary skills
  const proj1: AIProjectCandidate = {
    id: `proj-skill-001`,
    title: `Smart ${profile.interests[0] || 'Enterprise'} Platform using ${primarySkill} & ${secondarySkill}`,
    summary: `A high-feasibility MVP application built specifically with ${primarySkill} and ${secondarySkill} tailored for ${career} roles.`,
    problem: `Students and teams in ${profile.field} struggle with unoptimized workflows and lack real-time analytics in ${profile.interests[0] || 'software development'}.`,
    solution: `An automated ${primarySkill}-based service with a responsive ${secondarySkill} dashboard providing instant metrics, reporting, and workflow automation.`,
    target_users: [`${career} Candidates`, "Team Leads", "Project Assessors"],
    required_skills: [primarySkill, secondarySkill],
    technologies: skills.slice(0, 4),
    complexity: 5,
    features: [
      { name: `Core ${primarySkill} Ingestion Engine`, description: `Service backend built with ${primarySkill} processing domain input payloads`, priority: "MUST HAVE", estimated_days: 3 },
      { name: `${secondarySkill} Interactive Dashboard`, description: `User interface rendering real-time data visualization and metrics`, priority: "MUST HAVE", estimated_days: 3 },
      { name: "Automated Data Export & Reports", description: "Export telemetry reports to CSV and JSON formats", priority: "SHOULD HAVE", estimated_days: 2 },
    ],
    optional_features: ["Theme switcher", "Dark mode UI"],
    risks: [
      { risk: "Initial data seeding delay", severity: "low", probability: "low", impact: "Low", mitigation: "Use synthetic mock dataset" }
    ],
    skill_gaps: [],
    demo_flow: [
      `Launch ${secondarySkill} web dashboard`,
      `Submit sample payload to ${primarySkill} API endpoint`,
      "Observe live metric updates and generated report"
    ],
    innovation_opportunities: [`Optimized ${primarySkill} execution pipeline`]
  };

  // Project 2: Secondary Domain Project
  const proj2: AIProjectCandidate = {
    id: `proj-skill-002`,
    title: `Automated ${profile.interests[1] || 'Analytics'} Assessor powered by ${tertiarySkill}`,
    summary: `A specialized developer tool and analysis platform built using ${tertiarySkill} and ${primarySkill}.`,
    problem: `Manual inspection of ${profile.interests[1] || 'domain data'} is error-prone and time-consuming.`,
    solution: `An intelligent scanner service using ${tertiarySkill} to parse inputs and generate structured quality metrics.`,
    target_users: ["Technical Evaluators", "Data Analysts", "Engineering Managers"],
    required_skills: [tertiarySkill, primarySkill],
    technologies: Array.from(new Set([tertiarySkill, primarySkill, secondarySkill, "SQL"])),
    complexity: 6,
    features: [
      { name: `${tertiarySkill} Static Analysis Module`, description: `Parses incoming data streams to compute quality scores`, priority: "MUST HAVE", estimated_days: 4 },
      { name: "Summary Report Generator", description: "Generates formatted PDF/JSON evaluation summaries", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Interactive Metric Graphs", description: "Visual radar charts displaying performance metrics", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Historical log archive"],
    risks: [
      { risk: "Parse latency on large datasets", severity: "medium", probability: "low", impact: "Medium", mitigation: "Implement batch processing" }
    ],
    skill_gaps: [],
    demo_flow: [
      "Select dataset file",
      `Trigger ${tertiarySkill} analysis pipeline`,
      "Inspect radar score charts"
    ],
    innovation_opportunities: [`Automated ${tertiarySkill} insights`]
  };

  // Project 3: Overambitious Bloated Project (Trigger for Scope Explosion Rescue)
  const proj3: AIProjectCandidate = {
    id: `proj-skill-003`,
    title: `Smart ${profile.interests[0] || 'AI'} System + Blockchain + Custom IoT Hardware + Native Mobile App`,
    summary: `An overambitious project combining ${primarySkill}, custom microcontroller IoT hardware, Ethereum smart contracts, and native mobile apps.`,
    problem: `Extremely complex multi-domain requirements causing excessive hardware dependencies and timeline collapse.`,
    solution: `Overkill architecture featuring physical hardware sensors, blockchain data logging, dual native mobile apps, and ${primarySkill} models.`,
    target_users: ["System Administrators", "Field Technicians"],
    required_skills: [primarySkill, "Solidity", "Swift/iOS", "Embedded C++"],
    technologies: [primarySkill, "Ethereum", "Custom IoT Board", "Swift", "Kotlin", secondarySkill],
    complexity: 10,
    features: [
      { name: "Custom Microcontroller IoT Sensor Board", description: "Hardware sensor requiring physical soldering and embedded debugging", priority: "REMOVE", estimated_days: 14 },
      { name: "Ethereum Smart Contracts for Data Audit", description: "Solidity smart contracts logging transactions on blockchain", priority: "REMOVE", estimated_days: 12 },
      { name: "Native iOS & Android Mobile Applications", description: "Dual native mobile apps for phone alerts", priority: "REMOVE", estimated_days: 15 },
      { name: `Core ${primarySkill} Prediction Model`, description: `Analytical model processing domain inputs`, priority: "MUST HAVE", estimated_days: 4 },
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
      "Show custom hardware",
      "Show blockchain log",
      "Show native mobile alert"
    ],
    innovation_opportunities: ["Rescope bloat into clean web MVP"]
  };

  return [proj1, proj2, proj3];
}

/**
 * Server-Side AI Generation Service with Zod Validation, 1-Retry Policy, and Graceful Demo Fallback.
 */
export async function generateProjectCandidates(
  profile: StudentProfileInput
): Promise<AIGenerationOutput> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || process.env.GROQ_API_KEY;

  // Dynamically build candidate projects from the student's actual selected skills
  const dynamicCandidates = buildDynamicCandidatesFromSkills(profile);

  if (isDemoMode || !apiKey) {
    console.log(`ℹ️ [AI Service] Generating dynamic candidate projects based on student skills: ${profile.skills.join(", ")}`);
    return { projects: dynamicCandidates };
  }

  // Attempt 1: Call LLM endpoint
  try {
    const systemPrompt = `You are an expert academic project architect. Generate 3 structured project candidates tailored EXACTLY to the student's selected skills: ${profile.skills.join(", ")} and career goal: ${profile.career_goal}. Return ONLY a valid JSON object with key "projects".`;

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
          { role: "user", content: `Student skills: ${profile.skills.join(", ")}, Field: ${profile.field}, Career: ${profile.career_goal}` },
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
    console.error("❌ [AI Service Error]:", msg);
  }

  return { projects: dynamicCandidates };
}
