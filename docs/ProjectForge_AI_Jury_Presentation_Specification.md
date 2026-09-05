# ProjectForge AI — Complete System Architecture & Jury Presentation Specification

> **Official PromptWars V2 Qualification Architecture Specification PDF Document**

---

## Executive Product Definition
**Product Name:** ProjectForge AI — AI Project Architect & Rescue Mentor  
**Core Positioning:** *“Don’t just generate a project. Build the right one — then ship it.”*  
**Decision Thesis:** *“We don't give students more project ideas — we help them make better project decisions.”*  
**Execution Thesis:** *“From project idea to live URL without making the student become a DevOps engineer.”*

---

## 1. System Architecture Topology
```text
[ Client Browser / Student UI ]  --->  [ Next.js 14 App Router (Vercel Edge) ]
                                         | (Zod Payload Validation & XSS Sanitization)
                                         v
                            [ FastAPI ML Microservice (Render Cloud) ]
                                         |
                                         +---> [ XGBoost Model Inference Engine ]
                                         |
                                         v
                            [ Supabase PostgreSQL + RLS ] <---> [ Redis Cache Tier ]
```

### Component Layer Breakdown:
- **Presentation Tier:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- **AI & Scoring Engine Tier:** Google Gemini API (`gemini-1.5-flash`), Deterministic 6-Factor Health Scoring Engine, Scope Explosion Rescue Engine (**43 → 86** score jump).
- **Backend & Database Tier:** FastAPI Python 3.11, Supabase PostgreSQL 15 with Row Level Security (RLS).
- **Auto-Ship V2 Layer:** Programmatic GitHub REST API OAuth Adapter (`@Sky-ydv2008`), Vercel & Render cloud deployment adapters, Diagnostic Failure Recovery Engine.

---

## 2. Deterministic 6-Factor Health Scoring Formula

Overall Health Score = (SkillFit * 0.25) + (Feasibility * 0.20) + (Innovation * 0.20) + (CareerValue * 0.15) + (DemoPotential * 0.10) + (RiskAdjustment * 0.10)

- **Skill Fit (25%):** Ratio of matched required skills to student skills + experience tier bonus.
- **Feasibility (20%):** Estimated build days vs student capacity (Timeline Months * 15 * Team Size).
- **Innovation (20%):** Complexity rating (1-10) and modern tech stack depth.
- **Career Value (15%):** Alignment with target career role.
- **Demo Potential (10%):** Presentation flow clarity.
- **Risk Adjustment (10%):** Deductions for high-severity risk factors.

---

## 3. Hero Feature — Scope Explosion Detection & AI Rescue
- **Diagnosed Bloat (Health Score 43/100 - HIGH RISK):** AI + Blockchain + Custom IoT Hardware + Native Mobile Apps + Real-time Analytics.
- **Rescue Action:** Strips hardware soldering, smart contract overhead, and dual mobile apps into MUST / SHOULD / COULD / REMOVE priority matrix.
- **Recalibrated Buildable MVP (Health Score 86/100 - BUILDABLE MVP):** Python prediction model + Next.js web dashboard.

---

## 4. 8-Tab Technical Architecture Blueprint
1. **Overview:** Problem Statement, Solution Summary, Target Personas, Academic/Industry Rationale.
2. **System Architecture:** Component Topology Diagram, Inter-Service Data Flow, Non-Functional Metrics (Model Latency < 50ms, Throughput 500 req/sec, Availability 99.9%).
3. **Features & Scope Priority:** Functional Specs, Non-Functional Specs, MUST/SHOULD/COULD/REMOVE Priority Model.
4. **Recommended Tech Stack:** In-depth selection & architectural rationale for Frontend, Backend, Database, and Cloud Hosting.
5. **Database Schema Design:** Relational PostgreSQL Tables (`student_profiles`, `patients`, `vitals_logs`, `risk_predictions`) with Data Types, Foreign Keys, and RLS Statements.
6. **RESTful API Endpoint Specs:** Full REST API Reference Table (HTTP Methods, Route, Access Control, Request/Response Payloads).
7. **Security & RLS Model:** OAuth 2.0 Auth, Row Level Security Policies, Zod Input Validation, Secret Management, Rate Limiting.
8. **Deployment Plan & Demo Script:** Vercel & Render hosting setup, Environment Variables Checklist, CI/CD Pipeline (`deploy.yml`), and 2-Minute Hackathon Demo Script.

---

## 5. Security & Privacy Audit
- **Zero Client Secret Exposure:** All API keys run 100% server-side.
- **Payload Sanitization:** `sanitizeInputText()` prevents XSS and prompt injection attacks.
- **Database RLS Policy Isolation:** 10 PostgreSQL tables enforce `ENABLE ROW LEVEL SECURITY` (`auth.uid() = user_id`).
- **HTTP Security Headers:** Strict CSP, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.

---

## 6. 2-Minute Jury Presentation Script Flow
- **0:00 – 0:30 (Hook):** Problem Hook & Student Constraints.
- **0:30 – 1:00 (Rescue Demo):** Trigger live AI Scope Rescue (show 43 → 86 score jump and feature stripping).
- **1:00 – 1:30 (Blueprint & Mentor):** Show 8-Tab Technical Blueprint & AI Mentor.
- **1:30 – 2:00 (Publish & Ship):** Auto GitHub Repository Creation (`Sky-ydv2008/ProjectForge_AI`) & One-Click Cloud Deployment.
