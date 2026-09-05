import { ProjectBlueprint } from "@/lib/validation/blueprint";

export const DEMO_PROJECT_BLUEPRINT: ProjectBlueprint = {
  id: "blueprint-medforge-001",
  projectTitle: "MedForge AI — Clinical Diagnostic & Risk Prediction Platform",
  generatedAt: new Date().toISOString(),
  overview: {
    problemStatement: "Clinicians in emergency departments face critical decision bottlenecks due to unintegrated patient vitals, leading to delayed triage and unflagged deterioration risks.",
    solutionSummary: "A multi-tier software architecture combining a Next.js 14 App Router frontend, a FastAPI microservice hosting an XGBoost predictive inference model, and a Supabase PostgreSQL database with strict Row Level Security (RLS).",
    targetUsers: ["Triage Nurses", "Emergency Room Physicians", "Clinical Operations Managers"],
    valueProposition: "Replaces manual paper triage with real-time 50ms patient risk calculations while guaranteeing 100% patient record isolation via PostgreSQL RLS.",
    academicValue: "Demonstrates practical full-stack integration of machine learning inference microservices with modern web frameworks and zero-trust security.",
  },
  architecture: {
    topology: "Decoupled 3-Tier System Architecture (Next.js Edge Frontend → FastAPI ML Microservice → Supabase Postgres & Redis Cache)",
    frontendComponent: "Next.js 14 (App Router) with React 18, Server Components, and Tailwind CSS hosted on Vercel.",
    backendComponent: "FastAPI Python 3.11 asynchronous microservice hosting trained XGBoost inference models on Render.",
    databaseComponent: "Supabase PostgreSQL 15 database instance with Row Level Security and Redis sub-second caching tier.",
    dataFlowDescription: "1. Client posts JSON patient vitals to Next.js API Route (/api/vitals/ingest).\n2. Next.js validates payload schema via Zod.\n3. Server forwards request to FastAPI Python inference microservice.\n4. XGBoost model predicts deterioration risk (0-100%) and computes SHAP feature attributions.\n5. Predictions stored in Supabase PostgreSQL and broadcasted via WebSockets to triage UI.",
    architectureDiagramSpec: `[ Client Browser ] ---> [ Next.js 14 App Router (Vercel) ]
                              | (Zod Validation)
                              v
                  [ FastAPI ML Microservice (Render) ]
                              |
                              +---> [ XGBoost Model Inference Engine ]
                              |
                              v
                  [ Supabase PostgreSQL + RLS ] <---> [ Redis Cache ]`,
    nonFunctionalMetrics: [
      "Model Inference Latency: < 50ms",
      "API Throughput: 500 requests/sec",
      "UI Render Latency: < 100ms",
      "Availability Target: 99.9% Uptime",
    ],
  },
  features: [
    { name: "Patient Intake & Vitals Ingestion API", description: "JSON REST endpoint accepting heart rate, blood pressure, oxygen saturation, and lab metrics", priority: "MUST HAVE", estimatedDays: 3 },
    { name: "XGBoost Deterioration Prediction Engine", description: "Trained Python model scoring 48-hour deterioration probability (0-100%)", priority: "MUST HAVE", estimatedDays: 4 },
    { name: "Real-Time Emergency Triage Dashboard", description: "Next.js React dashboard rendering live patient risk gauges and SHAP feature graphs", priority: "MUST HAVE", estimatedDays: 3 },
    { name: "Automated SMS Alert Dispatcher", description: "Twilio webhook triggering text notifications for patients scoring > 80% risk", priority: "SHOULD HAVE", estimatedDays: 2 },
    { name: "Ethereum Smart Contract Patient Audit", description: "Blockchain transaction logging (Stripped during Scope Explosion Rescue)", priority: "REMOVE", estimatedDays: 10 },
  ],
  techStack: {
    frontend: "Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons",
    backend: "Python 3.11, FastAPI, Uvicorn, Pandas, Scikit-Learn, XGBoost 2.0",
    database: "Supabase PostgreSQL 15, Redis Caching, Row Level Security (RLS)",
    styling: "Tailwind CSS + Custom Dark Theme Tokens",
    aiMlLibraries: ["XGBoost 2.0", "SHAP (Explainable AI)", "Pandas", "Scikit-Learn", "NumPy"],
    hosting: "Vercel (Frontend & Serverless Routes) & Render (FastAPI Inference Container)",
    rationale: "Selected to achieve sub-50ms model inference while maintaining a modern, responsive React interface. Next.js provides instant edge rendering, while FastAPI handles Python ML models natively.",
    frontendRationale: "Next.js 14 App Router offers server-side rendering, automatic route optimization, and seamless Vercel deployment.",
    backendRationale: "FastAPI is the highest-performance Python framework for machine learning model serving with async IO.",
    databaseRationale: "Supabase PostgreSQL provides enterprise relational storage with built-in RLS policies for strict HIPAA data isolation.",
  },
  databaseDesign: [
    {
      tableName: "student_profiles",
      columns: ["id (UUID, PK)", "user_id (UUID, FK)", "field (TEXT)", "degree (TEXT)", "skills (JSONB)", "created_at (TIMESTAMPTZ)"],
      primaryKey: "id",
      foreignKeys: ["user_id -> auth.users(id)"],
      description: "Stores student skills, hardware constraints, timeline, and target career goals.",
      rlsPolicy: "ENABLE RLS: auth.uid() = user_id",
    },
    {
      tableName: "patients",
      columns: ["id (UUID, PK)", "user_id (UUID, FK)", "age (INT)", "gender (TEXT)", "triage_score (INT)", "created_at (TIMESTAMPTZ)"],
      primaryKey: "id",
      foreignKeys: ["user_id -> auth.users(id)"],
      description: "Anonymized patient intake demographic records.",
      rlsPolicy: "ENABLE RLS: auth.uid() = user_id",
    },
    {
      tableName: "vitals_logs",
      columns: ["id (UUID, PK)", "patient_id (UUID, FK)", "heart_rate (INT)", "blood_pressure_sys (INT)", "oxygen_sat (NUMERIC)", "recorded_at (TIMESTAMPTZ)"],
      primaryKey: "id",
      foreignKeys: ["patient_id -> patients(id)"],
      description: "Time-series clinical observations ingested from sensors or manual intake.",
      rlsPolicy: "ENABLE RLS: EXISTS (SELECT 1 FROM patients WHERE id = vitals_logs.patient_id AND user_id = auth.uid())",
    },
    {
      tableName: "risk_predictions",
      columns: ["id (UUID, PK)", "patient_id (UUID, FK)", "risk_score (NUMERIC)", "risk_level (TEXT)", "top_factors (JSONB)", "created_at (TIMESTAMPTZ)"],
      primaryKey: "id",
      foreignKeys: ["patient_id -> patients(id)"],
      description: "Stores model inference output scores and SHAP feature attributions.",
      rlsPolicy: "ENABLE RLS: EXISTS (SELECT 1 FROM patients WHERE id = risk_predictions.patient_id AND user_id = auth.uid())",
    },
  ],
  apiEndpoints: [
    { method: "POST", route: "/api/vitals/ingest", description: "Ingests patient vitals JSON and executes XGBoost model inference", accessLevel: "Authenticated Staff", requestPayload: "{ patient_id: string, heart_rate: number, bp_sys: number, spo2: number }", responseStatus: "200 OK -> { risk_score: 84, level: 'HIGH' }" },
    { method: "GET", route: "/api/patients/high-risk", description: "Retrieves list of active emergency patients with risk score > 75%", accessLevel: "Authenticated Physician", requestPayload: "None", responseStatus: "200 OK -> { patients: [...] }" },
    { method: "GET", route: "/api/predictions/:patientId", description: "Returns historical risk trajectory and SHAP feature breakdown", accessLevel: "Authenticated Staff", requestPayload: "None", responseStatus: "200 OK -> { history: [...], top_factors: [...] }" },
    { method: "POST", route: "/api/projects/rescue", description: "Executes Scope Explosion Rescue engine on bloated project ideas", accessLevel: "Authenticated User", requestPayload: "{ profile: {...}, candidate: {...} }", responseStatus: "200 OK -> { rescuedCandidate: {...}, score: 86 }" },
    { method: "POST", route: "/api/projects/publish/github", description: "Programmatically creates GitHub repository and pushes initial commit", accessLevel: "Authenticated User", requestPayload: "{ repoConfig: {...}, token: string }", responseStatus: "200 OK -> { repositoryUrl: string, commitSha: string }" },
  ],
  securityModel: {
    authentication: "Supabase Auth with OAuth 2.0 (GitHub) & JWT Bearer Session Tokens.",
    authorizationRls: "PostgreSQL Row Level Security (auth.uid() = user_id) enforcing 100% data isolation between students/users.",
    inputValidation: "Zod Schema validation on 100% of client payloads & server API routes.",
    secretManagement: "All API tokens (OPENAI_API_KEY, VERCEL_API_TOKEN, RENDER_API_KEY) stored strictly in server-side environment variables.",
    rateLimiting: "Sliding-window rate limiter (100 requests/minute per authenticated user).",
  },
  deploymentPlan: {
    provider: "Vercel Platform (Next.js Frontend) + Render Cloud (FastAPI Inference Backend)",
    buildCommand: "npm run build",
    envVarsRequired: [
      "NEXT_PUBLIC_APP_URL",
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "FASTAPI_BACKEND_URL",
    ],
    demoFlowSteps: [
      "1. Open MedForge AI Live Dashboard on Vercel deployment URL",
      "2. Input sample patient vitals dataset (Heart Rate 112 bpm, BP 154 mmHg, SpO2 93%)",
      "3. Observe real-time XGBoost risk model prediction gauge update to 84% (High Risk)",
      "4. Inspect feature importance breakdown showing Systolic BP as top risk contributor",
      "5. Verify automated emergency triage alert notification dispatch",
    ],
    cicdPipeline: "GitHub Actions Workflow (.github/workflows/deploy.yml) building Next.js and running automated Zod schema checks on every commit.",
  },
};
