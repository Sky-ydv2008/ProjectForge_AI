# ProjectForge AI — System Architecture Specification

> **Official PromptWars V2 Qualification Architecture Document**

## 1. System Topology
ProjectForge AI follows a decoupled 3-tier micro-service architecture:

```text
[ Client Browser / Student UI ] ---> [ Next.js 14 App Router (Vercel Edge) ]
                                | (Zod Schema Validation & Input Sanitization)
                                v
                   [ FastAPI ML Microservice (Render Cloud) ]
                                |
                                +---> [ XGBoost Model Inference Engine ]
                                |
                                v
                   [ Supabase PostgreSQL + RLS ] <---> [ Redis Cache Tier ]
```

## 2. Component Layer Specifications

### Presentation Layer
* **Framework:** Next.js 14 (App Router) + React 18 + TypeScript.
* **Styling:** Tailwind CSS with human-designed developer tool tokens (`#07090e`, `#0d111c`, `#1e293b`).
* **State Management:** React Context (`AuthContext`, `ProfileContext`, `GitHubContext`).

### AI Inference & Scoring Layer
* **Deterministic Scoring Engine:** Mathematical formula ($SkillFit \times 0.25 + Feasibility \times 0.20 + Innovation \times 0.20 + Career \times 0.15 + Demo \times 0.10 + Risk \times 0.10$).
* **AI Service:** Google Gemini API (`gemini-1.5-flash`) with structured JSON schema enforcement and 1-retry fallback policy.
* **Scope Rescue Engine:** Feature priority model (MUST HAVE, SHOULD HAVE, COULD HAVE, REMOVE) stripping hardware/blockchain/mobile bloat to recalibrate health score (**43 → 86**).

### Database & Security Layer
* **Database:** Supabase PostgreSQL 15.
* **Security:** PostgreSQL Row Level Security (RLS) enabled across 10 tables (`auth.uid() = user_id`).
* **Secret Isolation:** Zero client-side API key leakage. All keys (`GEMINI_API_KEY`, `VERCEL_API_TOKEN`, `RENDER_API_KEY`) execute 100% server-side.
