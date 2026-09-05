import { ProjectBlueprint } from "@/lib/validation/blueprint";

export const DEMO_PROJECT_BLUEPRINT: ProjectBlueprint = {
  id: "blueprint-medforge-001",
  projectTitle: "MedForge AI — Clinical Diagnostic & Risk Prediction Platform",
  generatedAt: new Date().toISOString(),
  overview: {
    problemStatement: "Clinicians in busy emergency departments lack automated, real-time risk scores for patient deterioration based on incoming vital signs and laboratory metrics.",
    solutionSummary: "A lightweight web dashboard powered by a FastAPI Python backend and XGBoost model that predicts 48-hour deterioration risks with transparent feature attribution charts.",
    targetUsers: ["Triage Nurses", "Emergency Room Physicians", "Clinical Research Assistants"],
    valueProposition: "Replaces manual risk calculation with deterministic 50ms model predictions while guaranteeing 100% patient data isolation via Row Level Security.",
  },
  architecture: {
    topology: "Client-Server Micro-Monolith Topology",
    frontendComponent: "Next.js 14 (App Router) + React + Tailwind CSS client dashboard hosted on Vercel.",
    backendComponent: "FastAPI Python 3.11 inference service hosting the trained XGBoost model hosted on Render.",
    databaseComponent: "Supabase PostgreSQL instance storing anonymized patient records with RLS policies.",
    dataFlowDescription: "Client posts JSON vitals dataset → Next.js API route validates schema via Zod → Passes payload to FastAPI backend → XGBoost model predicts risk score (0-100%) → Results rendered on dashboard with Recharts visualization.",
  },
  features: [
    { name: "Patient Vitals Ingestion API", description: "JSON REST endpoint accepting heart rate, blood pressure, lab values, and age", priority: "MUST HAVE", estimatedDays: 3 },
    { name: "Deterioration Risk XGBoost Model", description: "Inference script calculating 48-hour deterioration probability", priority: "MUST HAVE", estimatedDays: 4 },
    { name: "Interactive Triage Dashboard", description: "Next.js frontend displaying patient risk gauges and high-risk flags", priority: "MUST HAVE", estimatedDays: 3 },
    { name: "Automated SMS Alert Notifications", description: "Twilio webhook triggering SMS alerts for patient scores > 80%", priority: "SHOULD HAVE", estimatedDays: 2 },
    { name: "Ethereum Smart Contract Logging", description: "Blockchain transaction audit trail (Stripped during Scope Rescue)", priority: "REMOVE", estimatedDays: 10 },
  ],
  techStack: {
    frontend: "Next.js 14 (App Router), React 18, TypeScript",
    backend: "Python 3.11, FastAPI, Uvicorn, Pandas, Scikit-Learn, XGBoost",
    database: "Supabase PostgreSQL with Row Level Security",
    styling: "Tailwind CSS, Lucide Icons, Recharts",
    aiMlLibraries: ["XGBoost 2.0", "Pandas", "Scikit-Learn", "NumPy"],
    hosting: "Vercel (Frontend App) & Render (FastAPI Inference Service)",
    rationale: "Next.js provides server-side performance and easy Vercel deployment; FastAPI handles Python ML model execution natively without heavy server management.",
  },
  databaseDesign: [
    {
      tableName: "patients",
      columns: ["id (UUID)", "created_at (TIMESTAMPTZ)", "age (INT)", "gender (TEXT)", "triage_score (INT)"],
      primaryKey: "id",
      foreignKeys: [],
      description: "Anonymized patient demographic and intake records.",
    },
    {
      tableName: "vitals_logs",
      columns: ["id (UUID)", "patient_id (UUID)", "heart_rate (INT)", "blood_pressure_sys (INT)", "oxygen_sat (NUMERIC)", "recorded_at (TIMESTAMPTZ)"],
      primaryKey: "id",
      foreignKeys: ["patient_id -> patients(id)"],
      description: "Time-series vitals observations ingested from sensors or manual entry.",
    },
    {
      tableName: "risk_predictions",
      columns: ["id (UUID)", "patient_id (UUID)", "risk_score (NUMERIC)", "risk_level (TEXT)", "top_factors (JSONB)", "created_at (TIMESTAMPTZ)"],
      primaryKey: "id",
      foreignKeys: ["patient_id -> patients(id)"],
      description: "Model prediction history and SHAP feature attributions.",
    },
  ],
  apiEndpoints: [
    { method: "POST", route: "/api/vitals/ingest", description: "Ingests patient vitals and returns real-time risk prediction score", accessLevel: "Authenticated Doctor / Nurse" },
    { method: "GET", route: "/api/patients/high-risk", description: "Retrieves list of active patients with risk scores > 75%", accessLevel: "Authenticated Doctor" },
    { method: "GET", route: "/api/predictions/:patientId", description: "Retrieves historical risk trajectory and top risk factors", accessLevel: "Authenticated Staff" },
  ],
  securityModel: {
    authentication: "Supabase Auth (JWT Bearer tokens with OAuth & Email support)",
    authorizationRls: "PostgreSQL Row Level Security (auth.uid() = user_id) enforcing medical data isolation.",
    inputValidation: "Zod schemas on all API endpoints validating numerical vitals ranges (e.g. Heart Rate 30-220 bpm).",
    secretManagement: "All API keys (Twilio, Supabase Service Role) stored strictly in server-side environment variables.",
  },
  deploymentPlan: {
    provider: "Vercel (Frontend & Next.js API) + Render (FastAPI Inference Backend)",
    buildCommand: "npm run build",
    envVarsRequired: [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "FASTAPI_BACKEND_URL",
    ],
    demoFlowSteps: [
      "Step 1: Open MedForge AI Dashboard on Vercel live URL",
      "Step 2: Upload sample patient intake dataset (CSV/JSON)",
      "Step 3: Observe real-time risk prediction gauge update to 84% (High Risk)",
      "Step 4: Inspect feature importance breakdown showing Systolic BP as top factor",
      "Step 5: Verify live SMS alert dispatch trigger",
    ],
  },
};
