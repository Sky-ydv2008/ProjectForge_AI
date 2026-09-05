import { ProjectRoadmap } from "@/lib/validation/roadmap";

export const DEMO_PROJECT_ROADMAP: ProjectRoadmap = {
  projectId: "proj-medforge-001",
  projectTitle: "MedForge AI — Clinical Risk Prediction Platform",
  tasks: [
    // Phase 1: Foundation & Environment Setup
    {
      id: "task-101",
      phase: "Phase 1: Foundation & Project Setup (Week 1)",
      task: "Initialize Next.js 14 App Router & Tailwind CSS Repository",
      description: "Set up project repository, folder architecture, and design system variables.",
      estimated_days: 1,
      status: "completed",
      order_index: 1,
    },
    {
      id: "task-102",
      phase: "Phase 1: Foundation & Project Setup (Week 1)",
      task: "Configure Supabase Auth & PostgreSQL Schema",
      description: "Run database migrations for student_profiles, projects, and enable Row Level Security (RLS).",
      estimated_days: 2,
      status: "completed",
      order_index: 2,
    },
    {
      id: "task-103",
      phase: "Phase 1: Foundation & Project Setup (Week 1)",
      task: "Setup Environment Variables & Server Secrets",
      description: "Configure .env.local with Supabase anon keys and server-side secret placeolders.",
      estimated_days: 1,
      status: "completed",
      order_index: 3,
    },

    // Phase 2: Core Backend & Data Ingestion
    {
      id: "task-201",
      phase: "Phase 2: Core Backend & AI Inference (Week 2)",
      task: "Develop Python XGBoost Risk Prediction Script",
      description: "Train model on MIMIC-III patient vitals dataset and export serialized model weights.",
      estimated_days: 3,
      status: "in_progress",
      order_index: 4,
    },
    {
      id: "task-202",
      phase: "Phase 2: Core Backend & AI Inference (Week 2)",
      task: "Build FastAPI REST Endpoint for Ingestion & Scoring",
      description: "Expose POST /api/vitals/ingest accepting JSON payloads and returning risk scores (0-100%).",
      estimated_days: 2,
      status: "pending",
      order_index: 5,
    },
    {
      id: "task-203",
      phase: "Phase 2: Core Backend & AI Inference (Week 2)",
      task: "Implement Zod Payload Validation & Error Handling",
      description: "Enforce numerical vitals boundaries to reject malformed patient payloads.",
      estimated_days: 1,
      status: "pending",
      order_index: 6,
    },

    // Phase 3: Frontend Analytics Dashboard
    {
      id: "task-301",
      phase: "Phase 3: Frontend Analytics Dashboard (Week 3)",
      task: "Create Interactive Triage Patient List & Gauges",
      description: "Build Next.js React components rendering patient risk score badges and status filters.",
      estimated_days: 2,
      status: "pending",
      order_index: 7,
    },
    {
      id: "task-302",
      phase: "Phase 3: Frontend Analytics Dashboard (Week 3)",
      task: "Integrate SHAP Feature Importance Radar Charts",
      description: "Render Recharts visualization highlighting top clinical risk factors per patient.",
      estimated_days: 2,
      status: "pending",
      order_index: 8,
    },
    {
      id: "task-303",
      phase: "Phase 3: Frontend Analytics Dashboard (Week 3)",
      task: "Add Mock Sensor Stream Simulator Component",
      description: "Add interactive controls to stream synthetic vitals data into the dashboard.",
      estimated_days: 1,
      status: "pending",
      order_index: 9,
    },

    // Phase 4: Integration, Auto-Publishing & Live Deployment
    {
      id: "task-401",
      phase: "Phase 4: Integration, Auto-Publish & Ship (Week 4)",
      task: "Connect GitHub OAuth & Programmatic Repo Creation",
      description: "Validate build setup and create initial repository commit via GitHub REST API.",
      estimated_days: 2,
      status: "pending",
      order_index: 10,
    },
    {
      id: "task-402",
      phase: "Phase 4: Integration, Auto-Publish & Ship (Week 4)",
      task: "Provision One-Click Vercel / Render Deployment",
      description: "Deploy Next.js frontend to Vercel and FastAPI backend service to Render.",
      estimated_days: 2,
      status: "pending",
      order_index: 11,
    },
    {
      id: "task-403",
      phase: "Phase 4: Integration, Auto-Publish & Ship (Week 4)",
      task: "Rehearse 2-Minute Hackathon Presentation Demo",
      description: "Verify live URL, test DEMO_MODE fallback, and practice judge Q&A script.",
      estimated_days: 1,
      status: "pending",
      order_index: 12,
    },
  ],
};
