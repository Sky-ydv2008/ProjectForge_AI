import { StudentProfileInput } from "@/lib/validation/profile";
import { aiGenerationOutputSchema, AIGenerationOutput, AIProjectCandidate } from "@/lib/validation/ai-generation";
import { callGeminiApi } from "./gemini-client";

/**
 * Intelligently reorders student skills by matching against their target career goal.
 */
export function prioritizeSkillsByCareerGoal(profile: StudentProfileInput): string[] {
  const skills = profile.skills && profile.skills.length > 0 ? [...profile.skills] : ["Python", "React", "TypeScript"];
  const goal = (profile.career_goal || "").toLowerCase();

  if (goal.includes("java") || goal.includes("spring")) {
    const javaKeywords = ["java", "spring boot", "spring", "mysql", "hibernate", "maven", "angular", "kafka"];
    skills.sort((a, b) => {
      const aMatch = javaKeywords.some((k) => a.toLowerCase().includes(k)) ? -1 : 1;
      const bMatch = javaKeywords.some((k) => b.toLowerCase().includes(k)) ? -1 : 1;
      return aMatch - bMatch;
    });
  } else if (goal.includes("python") || goal.includes("ai") || goal.includes("ml") || goal.includes("data")) {
    const aiKeywords = ["python", "pytorch", "fastapi", "pandas", "scikit-learn", "tensorflow", "django", "opencv"];
    skills.sort((a, b) => {
      const aMatch = aiKeywords.some((k) => a.toLowerCase().includes(k)) ? -1 : 1;
      const bMatch = aiKeywords.some((k) => b.toLowerCase().includes(k)) ? -1 : 1;
      return aMatch - bMatch;
    });
  } else if (goal.includes("react") || goal.includes("frontend") || goal.includes("web") || goal.includes("node")) {
    const webKeywords = ["react", "next.js", "typescript", "node.js", "tailwind css", "express.js", "javascript"];
    skills.sort((a, b) => {
      const aMatch = webKeywords.some((k) => a.toLowerCase().includes(k)) ? -1 : 1;
      const bMatch = webKeywords.some((k) => b.toLowerCase().includes(k)) ? -1 : 1;
      return aMatch - bMatch;
    });
  } else if (goal.includes("cpp") || goal.includes("c++") || goal.includes("embedded") || goal.includes("vision")) {
    const cppKeywords = ["c++", "cpp", "qt", "opencv", "cuda", "linux", "ros"];
    skills.sort((a, b) => {
      const aMatch = cppKeywords.some((k) => a.toLowerCase().includes(k)) ? -1 : 1;
      const bMatch = cppKeywords.some((k) => b.toLowerCase().includes(k)) ? -1 : 1;
      return aMatch - bMatch;
    });
  }

  return skills;
}

/**
 * Dynamically generates 8 distinct candidate projects matching student's actual selected skills and career goal.
 */
export function buildDynamicCandidatesFromSkills(profile: StudentProfileInput): AIProjectCandidate[] {
  const sortedSkills = prioritizeSkillsByCareerGoal(profile);
  
  const primarySkill = sortedSkills[0] || "Java";
  const secondarySkill = sortedSkills[1] || primarySkill;
  const tertiarySkill = sortedSkills[2] || primarySkill;
  const quaternarySkill = sortedSkills[3] || secondarySkill;
  const quinarySkill = sortedSkills[4] || primarySkill;

  const career = profile.career_goal || "Software Engineer";
  const domain1 = profile.interests[0] || "Enterprise Systems";
  const domain2 = profile.interests[1] || "Analytics & Performance";
  const domain3 = profile.interests[2] || "Cloud Operations";

  // Candidate 1: Core Primary Skill Feasible MVP (Matches Career Goal & Skills)
  const cand1: AIProjectCandidate = {
    id: `proj-${primarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-001`,
    title: `${primarySkill} & ${secondarySkill} Smart ${domain1} Platform`,
    summary: `A high-feasibility MVP application built specifically using ${primarySkill} and ${secondarySkill} tailored for ${career} roles.`,
    problem: `Organizations in ${profile.field} struggle with manual workflows and lack real-time telemetry analytics for ${domain1}.`,
    solution: `An automated ${primarySkill}-based core processing engine with a responsive ${secondarySkill} dashboard providing live metrics and reporting.`,
    target_users: [`${career} Candidates`, "Team Leads", "Domain Managers"],
    required_skills: [primarySkill, secondarySkill],
    technologies: sortedSkills.slice(0, 4),
    complexity: 5,
    features: [
      { name: `Core ${primarySkill} Processing Engine`, description: `Service backend built with ${primarySkill} processing domain payloads`, priority: "MUST HAVE", estimated_days: 3 },
      { name: `${secondarySkill} User Dashboard`, description: `Interface rendering data visualization, status flags, and user controls`, priority: "MUST HAVE", estimated_days: 3 },
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

  // Candidate 2: Developer Tool & Quality Assessor
  const cand2: AIProjectCandidate = {
    id: `proj-${tertiarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-002`,
    title: `${tertiarySkill} Automated Quality & Intelligence Assessor`,
    summary: `A specialized developer tool and analysis platform built using ${tertiarySkill} and ${primarySkill} for ${career} applicants.`,
    problem: `Manual inspection of ${domain2} data streams is slow and subject to human evaluation errors.`,
    solution: `An intelligent scanner service using ${tertiarySkill} to parse incoming data and generate instant metrics.`,
    target_users: ["Technical Evaluators", "Data Analysts", "Engineering Managers"],
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

  // Candidate 3: Full-Stack Web SaaS Portal
  const cand3: AIProjectCandidate = {
    id: `proj-${secondarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-003`,
    title: `Full-Stack ${domain3} Portal (${primarySkill} + ${secondarySkill})`,
    summary: `A multi-tenant application for managing ${domain3} workflows with secure data access controls.`,
    problem: `Teams lack a unified SaaS portal to manage multi-step ${domain3} operations and record history.`,
    solution: `A clean web application using ${primarySkill} and ${secondarySkill} with role-based access control and dashboard analytics.`,
    target_users: ["Project Managers", "Team Members", "Clients"],
    required_skills: [primarySkill, secondarySkill],
    technologies: Array.from(new Set([primarySkill, secondarySkill, quaternarySkill, "PostgreSQL"])),
    complexity: 5,
    features: [
      { name: "Multi-Tenant Auth & Role Access", description: "Role-based authorization for administrative and member views", priority: "MUST HAVE", estimated_days: 3 },
      { name: `${primarySkill} Operations Board`, description: "Interactive management interface", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Activity Logging & Audit Trail", description: "Records timestamped user actions and system changes", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Email notification webhooks"],
    risks: [
      { risk: "Session state management complexity", severity: "low", probability: "low", impact: "Low", mitigation: "Use JWT session tokens" }
    ],
    skill_gaps: [],
    demo_flow: ["Sign in as Admin", "Create new workspace", "Update task state on board"],
    innovation_opportunities: ["Role-based access pattern"]
  };

  // Candidate 4: Real-Time Event & Log Stream Processing Engine
  const cand4: AIProjectCandidate = {
    id: `proj-${quaternarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-004`,
    title: `Real-Time ${primarySkill} Log Stream Anomaly Detector`,
    summary: `High-throughput log ingestion and event streaming pipeline built with ${primarySkill} and ${quaternarySkill}.`,
    problem: `DevOps engineers fail to spot brute-force attacks and rate-limit violations in high-volume system logs.`,
    solution: `An event processing service using ${primarySkill} to parse logs in real-time and trigger instant alert thresholds.`,
    target_users: ["DevOps Engineers", "Security Analysts", "System Administrators"],
    required_skills: [primarySkill, quaternarySkill],
    technologies: Array.from(new Set([primarySkill, quaternarySkill, "Docker", "Redis"])),
    complexity: 6,
    features: [
      { name: `${primarySkill} Log Stream Parser`, description: "Ingests 500+ log lines/sec and flags error spikes", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Threshold Alert Rule Engine", description: "Triggers visual alerts when failure count exceeds 10 in 60s", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Live Terminal Stream Viewer", description: "WebSocket terminal view showing real-time log output", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Export incident report to JSON"],
    risks: [
      { risk: "High buffer memory usage during log bursts", severity: "medium", probability: "medium", impact: "Medium", mitigation: "Use Redis ring buffer" }
    ],
    skill_gaps: [],
    demo_flow: ["Start simulated log stream", "Inject synthetic brute force pattern", "Observe live alert trigger"],
    innovation_opportunities: ["Sub-second stream processing"]
  };

  // Candidate 5: Automated Workflow & Integration Hub
  const cand5: AIProjectCandidate = {
    id: `proj-${quinarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-005`,
    title: `${primarySkill} Automated Integration & API Orchestrator`,
    summary: `An integration hub connecting multi-service APIs using ${primarySkill} and ${secondarySkill}.`,
    problem: `Integrating disparate third-party REST APIs requires custom glue code and manual retry logic.`,
    solution: `An orchestration engine with automated retry policies, payload validation, and schema mapping.`,
    target_users: ["API Developers", "Integration Engineers"],
    required_skills: [primarySkill, secondarySkill],
    technologies: Array.from(new Set([primarySkill, secondarySkill, quinarySkill, "REST APIs"])),
    complexity: 5,
    features: [
      { name: "API Schema Mapper", description: "Maps incoming payload keys to target API endpoints", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Automated Retry & Backoff Pipeline", description: "Handles transient 500 errors with exponential backoff", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Execution History Inspector", description: "Logs request payloads, status codes, and execution times", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Webhook trigger builder"],
    risks: [
      { risk: "Third-party rate limiting during test runs", severity: "low", probability: "low", impact: "Low", mitigation: "Use mock API server" }
    ],
    skill_gaps: [],
    demo_flow: ["Configure API endpoint target", "Trigger workflow execution", "Inspect execution audit log"],
    innovation_opportunities: ["Resilient retry pipeline pattern"]
  };

  // Candidate 6: Interactive Telemetry & Metrics Dashboard
  const cand6: AIProjectCandidate = {
    id: `proj-${primarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-006`,
    title: `Interactive ${domain1} Telemetry & Performance Dashboard`,
    summary: `An interactive charting and telemetry analytics dashboard built with ${primarySkill} and ${secondarySkill}.`,
    problem: `Decision makers struggle to interpret raw data spreadsheets without visual graphs and filters.`,
    solution: `A responsive web dashboard rendering dynamic time-series charts, breakdown heatmaps, and filter controls.`,
    target_users: ["Business Analysts", "Product Managers", "Executives"],
    required_skills: [primarySkill, secondarySkill],
    technologies: Array.from(new Set([primarySkill, secondarySkill, "Chart.js", "Tailwind"])),
    complexity: 4,
    features: [
      { name: "Time-Series Charting Component", description: "Renders line, bar, and area charts for historical telemetry", priority: "MUST HAVE", estimated_days: 2 },
      { name: "Filter & Range Selector", description: "Filters telemetry metrics by date range and category", priority: "MUST HAVE", estimated_days: 2 },
      { name: "CSV/Excel Data Import Module", description: "Parses user CSV files and auto-populates chart series", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Print PDF summary stylesheet"],
    risks: [
      { risk: "DOM re-render slowness on large dataset charts", severity: "low", probability: "low", impact: "Low", mitigation: "Use canvas-based charting" }
    ],
    skill_gaps: [],
    demo_flow: ["Upload sample CSV data file", "Apply date range filter", "Export chart image"],
    innovation_opportunities: ["Instant client-side dataset parsing"]
  };

  // Candidate 7: Algorithmic Optimization & Decision Engine
  const cand7: AIProjectCandidate = {
    id: `proj-${tertiarySkill.toLowerCase().replace(/[^a-z0-9]/g, "")}-007`,
    title: `${primarySkill} Algorithmic Optimization & Decision Engine`,
    summary: `An advanced algorithmic optimization service built using ${primarySkill} and ${tertiarySkill} for ${career} applicants.`,
    problem: `Resource allocation in ${domain2} is inefficient when relying on static heuristic rules.`,
    solution: `An algorithmic solver that evaluates constraint combinations to calculate optimal allocation choices.`,
    target_users: ["Operations Engineers", "System Architects"],
    required_skills: [primarySkill, tertiarySkill],
    technologies: Array.from(new Set([primarySkill, tertiarySkill, secondarySkill, "SQL"])),
    complexity: 7,
    features: [
      { name: "Constraint Evaluation Solver", description: "Evaluates multi-variable resource constraints to optimize outcome score", priority: "MUST HAVE", estimated_days: 4 },
      { name: "Scenario Simulation Matrix", description: "Simulates best-case, average-case, and worst-case resource outcomes", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Decision Rationale Inspector", description: "Displays step-by-step mathematical reasoning for recommendations", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Export scenario comparison table"],
    risks: [
      { risk: "Computational complexity on large variable sets", severity: "medium", probability: "low", impact: "Medium", mitigation: "Apply heuristic pruning" }
    ],
    skill_gaps: [],
    demo_flow: ["Input variable constraints", "Run algorithmic solver", "Compare simulated scenarios"],
    innovation_opportunities: ["Transparent constraint optimization"]
  };

  // Candidate 8: Overambitious Bloated Project (Scope Explosion Target)
  const cand8: AIProjectCandidate = {
    id: `proj-bloated-008`,
    title: `${primarySkill} ${domain1} System + Blockchain Privacy + Custom Microcontroller Hardware + Dual Native Mobile Apps`,
    summary: `An overambitious candidate combining ${primarySkill}, custom microcontroller IoT hardware, Ethereum smart contracts, and native mobile apps.`,
    problem: `Extremely complex multi-domain requirements causing hardware soldering dependencies and timeline collapse.`,
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

  return [cand1, cand2, cand3, cand4, cand5, cand6, cand7, cand8];
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

  const sortedSkills = prioritizeSkillsByCareerGoal(profile);
  const dynamicCandidates = buildDynamicCandidatesFromSkills(profile);

  const systemPrompt = `You are an expert academic project architect.
Given a student's target career goal: "${profile.career_goal}" and selected skills: [${sortedSkills.join(", ")}], field of study: "${profile.field}", generate 8 structured project candidates tailored EXACTLY to their career goal and skills.

CRITICAL INSTRUCTIONS:
1. Prioritize skills matching their career goal: "${profile.career_goal}". Candidate 1 MUST be an MVP project using their primary target career skills: ${sortedSkills.slice(0, 3).join(", ")}.
2. Generate 8 distinct, diverse project candidates.
3. Candidates 1 to 7 must be buildable MVP projects across web, analytics, developer tools, and streaming pipelines.
4. Candidate 8 must be an overambitious candidate combining their skills with hardware/blockchain/mobile bloat (marked REMOVE) to trigger Scope Explosion Rescue.
5. Return ONLY a valid JSON object matching: { "projects": [...] }`;

  const userPrompt = `Student Profile:
- Target Career Goal: ${profile.career_goal}
- Prioritized Skills: ${sortedSkills.join(", ")}
- Field: ${profile.field} (${profile.degree})
- Team Size: ${profile.team_size} members
- Timeline: ${profile.timeline_months} months
- Experience: ${profile.experience}`;

  // Priority 1: Call Google Gemini API if GEMINI_API_KEY is configured
  if (geminiApiKey && !isDemoMode) {
    try {
      console.log(`🤖 [AI Service] Invoking Google Gemini API for career: ${profile.career_goal}, skills: ${sortedSkills.slice(0, 5).join(", ")}`);
      const rawText = await callGeminiApi(systemPrompt, userPrompt, geminiApiKey);
      const parsedJson = JSON.parse(rawText);
      const validation = aiGenerationOutputSchema.safeParse(parsedJson);
      if (validation.success) {
        return validation.data;
      }
      console.warn("⚠️ [Gemini API] Zod schema validation failed. Using career-tailored candidate engine.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("❌ [Gemini API Error]:", msg);
    }
  }

  // Priority 2: Call OpenAI / Groq API if OPENAI_API_KEY is configured
  if (openaiApiKey && !isDemoMode) {
    try {
      console.log(`🤖 [AI Service] Invoking OpenAI API for career: ${profile.career_goal}`);
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

  // Priority 3: Use Dynamic Candidate Generator returning 8 career-tailored candidates
  console.log(`ℹ️ [AI Service] Generating 8 dynamic candidate projects based on career: ${profile.career_goal}, skills: ${sortedSkills.slice(0, 5).join(", ")}`);
  return { projects: dynamicCandidates };
}
