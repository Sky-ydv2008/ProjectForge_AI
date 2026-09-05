import { AIProjectCandidate } from "@/lib/validation/ai-generation";

export const DEMO_PROJECT_CANDIDATES: AIProjectCandidate[] = [
  {
    id: "proj-cand-001",
    title: "MedForge AI — Clinical Diagnostic & Risk Prediction Platform",
    summary: "Web-based clinical risk score predictor using tabular EHR datasets and FastAPI backends for patient triage.",
    problem: "Clinicians in busy ICUs lack real-time risk scores for patient deterioration based on admission vitals.",
    solution: "A lightweight web dashboard powered by an XGBoost risk model that predicts 48-hour deterioration risks with transparent feature attribution.",
    target_users: ["Triage Nurses", "Resident Doctors", "Clinical Researchers"],
    required_skills: ["Python", "FastAPI", "React", "TypeScript", "Pandas", "Scikit-Learn"],
    technologies: ["Next.js 14", "Python 3.11", "FastAPI", "Tailwind CSS", "Chart.js"],
    complexity: 6,
    features: [
      { name: "Vitals Data Ingestion API", description: "JSON endpoint to upload patient heart rate, blood pressure, and lab values", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Deterioration Risk Scoring Model", description: "Trained XGBoost model predicting deterioration probability (0-100%)", priority: "MUST HAVE", estimated_days: 4 },
      { name: "Interactive Triage Dashboard", description: "React frontend displaying high-risk patients with visual alert flags", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Automated SMS Alert Dispatch", description: "Twilio integration sending SMS notifications for critical patients", priority: "SHOULD HAVE", estimated_days: 2 },
      { name: "Ethereum Smart Contract Audit Trail", description: "Blockchain transaction logging for HIPAA compliance", priority: "REMOVE", estimated_days: 10 }
    ],
    optional_features: ["Export PDF patient summary", "Dark theme mode"],
    risks: [
      { risk: "Lack of real EHR integration APIs", severity: "medium", probability: "high", impact: "High", mitigation: "Use synthetic MIMIC-III dataset subset for demonstration" },
      { risk: "Model latency during peak batch scoring", severity: "low", probability: "medium", impact: "Low", mitigation: "Cache predictions in Redis/In-memory dict" }
    ],
    skill_gaps: ["Advanced Model Interpretability (SHAP)"],
    demo_flow: [
      "Upload sample patient CSV containing vitals data",
      "View live risk scoring gauge update to 84% Deterioration Risk",
      "Inspect feature importance chart showing Elevated Blood Pressure as top factor",
      "Trigger emergency triage notification dispatch"
    ],
    innovation_opportunities: ["Explainable AI visualization for non-technical hospital staff"]
  },
  {
    id: "proj-cand-002",
    title: "CodePulse — Automated Student Repo Review & Skill Assessor",
    summary: "Developer intelligence dashboard analyzing GitHub repositories to evaluate code quality and skill proficiencies.",
    problem: "Recruiters and professors spend hours manually reading student GitHub repos to judge actual engineering depth.",
    solution: "An automated repo scanner using AST parsing and LLM code summary to generate a verified student skill radar map.",
    target_users: ["Technical Recruiters", "University Faculty", "Student Job Applicants"],
    required_skills: ["TypeScript", "Next.js", "Node.js", "GitHub API", "Zod"],
    technologies: ["Next.js App Router", "Tailwind CSS", "Octokit GitHub SDK", "Supabase Postgres"],
    complexity: 5,
    features: [
      { name: "GitHub Repository OAuth Scanner", description: "Fetches user public repos and extracts commit frequency and languages", priority: "MUST HAVE", estimated_days: 2 },
      { name: "AST Static Analysis Engine", description: "Calculates cyclomatic complexity and unit test coverage", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Visual Skill Radar Chart", description: "Interactive spider graph highlighting frontend vs backend proficiency", priority: "MUST HAVE", estimated_days: 2 },
      { name: "AI Code Review Summary", description: "LLM prompt generating 3 constructive code quality tips", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["PDF Report export", "Sharable public resume badge"],
    risks: [
      { risk: "GitHub API rate limits on unauthenticated requests", severity: "high", probability: "medium", impact: "High", mitigation: "Require GitHub OAuth token authentication" }
    ],
    skill_gaps: ["Deep AST parsing for C++ and Rust"],
    demo_flow: [
      "Enter student GitHub username (e.g. alex-chen-dev)",
      "System scans top 5 repos and computes commit stats",
      "Displays interactive Skill Radar Chart showing 88% TypeScript & 75% Python",
      "Generates 1-page PDF Report card for job applications"
    ],
    innovation_opportunities: ["Verifiable on-chain developer proof badge"]
  },
  {
    id: "proj-cand-003",
    title: "FinShield AI — Real-time Fraud Detection & Merchant Analytics",
    summary: "E-commerce transaction streaming simulator with isolation forest anomaly detection for instant fraud blocking.",
    problem: "Small payment gateways suffer chargeback losses due to slow rule-based fraud filters.",
    solution: "A streaming fraud engine evaluating micro-transaction features in under 50ms with live webhook alerts.",
    target_users: ["FinTech Developers", "Payment Operations", "Risk Analysts"],
    required_skills: ["Python", "FastAPI", "React", "PostgreSQL", "Tailwind"],
    technologies: ["FastAPI", "Next.js", "PostgreSQL", "Recharts", "WebSockets"],
    complexity: 7,
    features: [
      { name: "Transaction Stream Simulator", description: "Generates 10 transactions/sec with controllable fraud injection rate", priority: "MUST HAVE", estimated_days: 2 },
      { name: "Isolation Forest Anomaly Model", description: "Scores incoming transactions for location and amount anomalies", priority: "MUST HAVE", estimated_days: 4 },
      { name: "Real-time Live Monitoring Wall", description: "WebSocket dashboard flashing red alerts on blocked fraud attempts", priority: "MUST HAVE", estimated_days: 3 },
      { name: "Custom Fraud Rule Editor", description: "Allows admins to add conditional threshold rules without code deploy", priority: "SHOULD HAVE", estimated_days: 2 }
    ],
    optional_features: ["Export transaction audit log to CSV"],
    risks: [
      { risk: "High false-positive rate blocking legitimate customers", severity: "medium", probability: "medium", impact: "Medium", mitigation: "Adjust Isolation Forest contamination parameter to 0.05" }
    ],
    skill_gaps: ["High-throughput Kafka streaming pipeline"],
    demo_flow: [
      "Start simulated transaction feed (10 transactions/sec)",
      "Inject synthetic $5,000 international charge anomaly",
      "Dashboard instantly flags transaction as FRAUD RISK 92%",
      "Shows transaction blocked in < 35ms response time"
    ],
    innovation_opportunities: ["Instant merchant chargeback protection sandbox"]
  }
];
