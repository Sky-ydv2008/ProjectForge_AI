# ProjectForge AI — AI Project Architect & Rescue Mentor

#### PromptWars Qualification Edition — V2 Auto GitHub Publishing + One-Click Deployment

> **“Don’t just generate a project. Build the right one — then ship it.”**

ProjectForge AI is an AI-powered project architect, rescue mentor, and auto-publishing execution platform for final-year computer science and engineering students.

---

## 1. Problem & Product Positioning

**The Student Problem:**
Students do not only struggle to find project ideas. They struggle to judge whether an idea fits their skills, team size, timeline, budget, career goals, and available hardware. Often, students pick overambitious combinations (e.g. AI + Blockchain + IoT + Healthcare + Native Mobile Apps) and fail before completion.

**The Solution:**
ProjectForge AI evaluates student skills and constraints, scores project candidates deterministically, detects scope explosion in bloated ideas, rescues unrealistic projects into buildable MVPs, generates technical architecture blueprints and weekly roadmaps, provides project-aware mentoring, and **programmatically publishes the code to GitHub & deploys live to Vercel/Render.**

**Core Differentiators:**
1. **Decision Differentiator:** *“We don't give students more project ideas — we help them make better project decisions.”*
2. **Execution Differentiator:** *“From project idea to live URL without making the student become a DevOps engineer.”*

---

## 2. Core Feature Set

* **Student Profile & Constraints Onboarding (M3):** Captures field, degree, programming languages, ML background, team size, budget, timeline, hardware, and career goal with Zod schema validation.
* **Deterministic Scoring Engine (M6):** Transparent 6-factor health score formula ($SkillFit \times 0.25 + Feasibility \times 0.20 + Innovation \times 0.20 + Career \times 0.15 + Demo \times 0.10 + Risk \times 0.10$).
* **Side-by-Side Candidate Comparison Matrix (M7):** Compares candidates side-by-side and formulates explicit recommendation rationale.
* **Hero Feature — Scope Explosion Detection & AI Rescue (M9):** Diagnoses bloated scope (e.g. Health Score 43/100, HIGH RISK), strips hardware/blockchain/mobile bloat, and recalibrates health score (**43 → 86**).
* **Technical Blueprint Generator (M8):** Generates 8 technical tabs: Overview, Architecture Topology, Features (MUST/SHOULD/COULD/REMOVE), Recommended Stack, Database Schema, REST APIs, Security Model, and Deployment Plan.
* **Task Roadmap & Progress Tracker (M10):** 4-phase weekly build roadmap with interactive status toggles and Emergency Scope Cut suggestions.
* **Project-Aware AI Mentor (M11):** Context-synced assistant answering high-stakes student dilemmas (e.g. *“I only have 6 weeks left. What should I remove?”*).
* **Auto GitHub Publishing (M12 & M13):** OAuth connection, preflight checklist, programmatic repository creation, initial commit pushing, and SHA verification.
* **1-Click Cloud Deployment Adapters (M14 & M15):** Vercel, Render, and Netlify hosting adapters with environment variable mapping, build logs, and diagnostic error recovery + retry.

---

## 3. Technology Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 14 (App Router) + React 18 + TypeScript |
| **Styling & UI** | Tailwind CSS + Lucide React + Custom Glow Utilities |
| **Database & Auth** | Supabase Auth + Supabase PostgreSQL + Row Level Security (RLS) |
| **Validation** | Zod (Client & Server-Side Schemas) |
| **AI Reliability** | Server-side LLM API + 1-Retry Policy + Deterministic Demo Fixtures |
| **Publish & Deploy** | GitHub REST API + Vercel REST API + Render REST API + Netlify API |

---

## 4. Security & Privacy Audit

* **Zero Client-Side Secret Leakage:** All secrets (`OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `VERCEL_API_TOKEN`, `RENDER_API_KEY`, `GITHUB_CLIENT_SECRET`) are server-side only.
* **Payload Validation:** Every endpoint validates incoming payloads with Zod schemas.
* **PostgreSQL Row Level Security (RLS):** Enabled on all 10 database tables (`auth.uid() = user_id`).
* **Prompt Injection Resistance:** System instructions treat user content as untrusted input and enforce structured JSON returns.

---

## 5. Quick Start & Local Setup

### Prerequisites
* Node.js v18+ or v20+
* npm v9+

### Installation
\`\`\`bash
# 1. Clone repository
git clone https://github.com/alex-chen-dev/ProjectForge_AI.git
cd ProjectForge_AI

# 2. Install dependencies
npm install

# 3. Create .env.local
cp .env.example .env.local

# 4. Start Next.js Development Server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Environment Variables Reference (`.env.local`)

\`\`\`env
# Public App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEMO_MODE=true

# Supabase Credentials (Optional for Demo Mode)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-placeholder
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-placeholder

# LLM & Integration Keys (Optional for Demo Mode)
OPENAI_API_KEY=your-openai-api-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
VERCEL_API_TOKEN=your-vercel-api-token
RENDER_API_KEY=your-render-api-key
\`\`\`

---

## 7. 2-Minute Hackathon Presentation Script

1. **0:00 - 0:20 (Hook):** “Most students don't have an idea problem. They have a project-selection problem.” Show overambitious project idea (AI + Blockchain + IoT + Mobile).
2. **0:20 - 0:55 (Hero Feature - Scope Rescue):** Trigger **Scope Explosion Rescue**. Show health score jump from **43/100 → 86/100**, feature priority breakdown, and stripped bloat.
3. **0:55 - 1:30 (Blueprint & Mentor):** Showcase the 8-tab Technical Blueprint, 4-phase Roadmap, and ask the AI Mentor: *“I only have 6 weeks left. What should I remove?”*
4. **1:30 - 2:00 (Publish & Ship):** Open Publish Center, connect GitHub (`@alex-chen-dev`), click **Publish & Deploy**, and demonstrate the live deployment URL (`https://medforge-ai-diagnostic.vercel.app`).
