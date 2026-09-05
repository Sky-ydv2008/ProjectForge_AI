import { MentorMessage } from "@/lib/validation/mentor";

export const QUICK_ACTION_PROMPTS = [
  "I only have 6 weeks left. What should I remove?",
  "How should I structure my PostgreSQL database schema?",
  "What key features should I present in my 2-minute hackathon demo?",
  "How do I prepare for technical viva / judge questions on this project?",
];

export const DEMO_MENTOR_RESPONSES: Record<string, Omit<MentorMessage, "id" | "createdAt">> = {
  "I only have 6 weeks left. What should I remove?": {
    role: "assistant",
    content: "Based on your student profile (3-person team, 4 months initial plan) and your active project state, here is your emergency 6-week scope reduction strategy:",
    recommendation: "Defer Twilio SMS alerts, complex PDF report exporting, and user role management to V2. Keep only the Python XGBoost risk model and the Next.js triage dashboard.",
    why: "Your core problem-solution thesis relies 100% on demonstrating accurate patient risk prediction and a responsive triage dashboard. SMS integration and PDF export add third-party API setup overhead without adding hackathon judging points.",
    implementationSteps: [
      "1. Remove Twilio API webhook triggers from FastAPI ingestion endpoint (saves 2 days).",
      "2. Replace custom PDF generator with browser native print stylesheet (saves 3 days).",
      "3. Mock external sensor inputs using synthetic CSV vitals stream generator (saves 4 days).",
      "4. Freeze database migrations to 3 core tables: patients, vitals_logs, and risk_predictions."
    ],
    risks: [
      "Risk: Judges ask about SMS notifications during demo → Mitigation: Explain that notification webhooks are modeled in the architecture blueprint as Phase 2 features."
    ],
    timeLimitedAlternative: "If compressed to under 2 weeks, skip FastAPI separate hosting and deploy Python model direct to Next.js API routes or client WebAssembly."
  },
  "How should I structure my PostgreSQL database schema?": {
    role: "assistant",
    content: "Here is the recommended 3-table relational schema designed for Supabase Row Level Security (RLS) and quick 50ms query performance:",
    recommendation: "Use 3 normalized tables: `patients` (demographics), `vitals_logs` (time-series sensor inputs), and `risk_predictions` (model output scores with JSONB SHAP factors).",
    why: "Separating time-series vitals from static patient profiles keeps queries fast and avoids table bloat. Storing top risk factors inside JSONB allows flexible UI rendering without schema migrations.",
    implementationSteps: [
      "1. Create `patients` table with UUID primary key and user_id FK linked to auth.users.",
      "2. Create `vitals_logs` table with FK referencing patient_id and index on (patient_id, recorded_at).",
      "3. Create `risk_predictions` table with JSONB column for feature attributions.",
      "4. Enable RLS on all 3 tables with policy: auth.uid() = user_id."
    ],
    risks: [
      "Risk: Missing foreign key indexes causes slow join queries → Mitigation: Add explicit index on `idx_vitals_patient_id`."
    ],
    timeLimitedAlternative: "Use single flattened `patient_assessments` table for rapid hackathon MVP prototyping."
  },
  "What key features should I present in my 2-minute hackathon demo?": {
    role: "assistant",
    content: "Judges decide winners in the first 90 seconds. Follow this exact 5-step presentation script for maximum impact:",
    recommendation: "Focus 80% of your demo time on the live interactive Scope Rescue recalculation (43 → 86 score) and the real-time patient risk prediction gauge.",
    why: "Judges see hundreds of basic web apps. Showing how ProjectForge AI rescued an overambitious project into a buildable MVP proves unique engineering intelligence.",
    implementationSteps: [
      "0:00 - 0:20: Hook — State student project problem (Scope bloat and deadline failure).",
      "0:20 - 0:55: Demo — Trigger live AI Scope Rescue (show 43 → 86 score jump and feature stripping).",
      "0:55 - 1:30: Architecture — Show 8-tab Technical Blueprint & PostgreSQL RLS isolation.",
      "1:30 - 2:00: Ship — Click Publish to GitHub & Vercel live URL deployment."
    ],
    risks: [
      "Risk: WiFi network failure during demo → Mitigation: Keep DEMO_MODE=true active so local fallback fixtures run seamlessly without external API calls."
    ],
    timeLimitedAlternative: "Keep pre-rendered screen recording video ready as emergency backup."
  },
  "How do I prepare for technical viva / judge questions on this project?": {
    role: "assistant",
    content: "Here are the top 3 questions judges and academic examiners will ask, along with your winning evidence-based answers:",
    recommendation: "Emphasize that scores are computed deterministically by an application engine (not hallucinated by LLM), and user data is isolated via Supabase Row Level Security.",
    why: "Judges test whether your project is just a ChatGPT wrapper or real software engineering.",
    implementationSteps: [
      "Q1: 'Isn't this just a ChatGPT wrapper?' → Answer: 'No. The LLM only generates semantic candidates; our application engine computes 6-factor health scores deterministically and enforces RLS isolation.'",
      "Q2: 'How do you handle patient data privacy?' → Answer: 'We enforce PostgreSQL Row Level Security (auth.uid() = user_id) so medical records are isolated per authenticated user.'",
      "Q3: 'What happens if external AI APIs fail?' → Answer: 'We implemented a 1-retry Zod validation policy and built-in DEMO_MODE deterministic fallback fixtures.'"
    ],
    risks: [
      "Risk: Stumbling on mathematical scoring weights → Mitigation: Show judges the formula callout banner on the Health Score Card."
    ],
    timeLimitedAlternative: "Memorize the 6 scoring weights: Skill 25%, Feasibility 20%, Innovation 20%, Career 15%, Demo 10%, Risk 10%."
  }
};
