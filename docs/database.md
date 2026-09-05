# ProjectForge AI — Database Schema & Row Level Security (RLS) Specification

> **Official PromptWars V2 Database Architecture Document**

## 1. Relational Schema Architecture

ProjectForge AI operates on a multi-tenant PostgreSQL database hosted on managed Supabase infrastructure. Strict Row Level Security (RLS) is enabled across 100% of tables to guarantee zero cross-user medical or project data leakage.

```text
auth.users (Supabase Auth Core)
  ├── student_profiles (user_id PK/FK)
  ├── projects (user_id FK)
  │     ├── project_features (project_id FK)
  │     ├── project_risks (project_id FK)
  │     ├── project_roadmap (project_id FK)
  │     ├── deployment_configs (project_id FK)
  │     └── deployment_env_vars (project_id FK)
  ├── mentor_messages (user_id FK, project_id FK)
  ├── github_connections (user_id PK/FK)
  └── publish_jobs (user_id FK, project_id FK)
```

## 2. Table Specifications & RLS Isolation Rules

| Table Name | Purpose | Primary Key | Foreign Keys | RLS Policy Rule |
| --- | --- | --- | --- | --- |
| `student_profiles` | Student skills, constraints, timeline, hardware | `id (UUID)` | `user_id -> auth.users(id)` | `ENABLE RLS: auth.uid() = user_id` |
| `projects` | Project candidates & health scores | `id (UUID)` | `user_id -> auth.users(id)` | `ENABLE RLS: auth.uid() = user_id` |
| `project_features` | Rescoped feature priorities (MUST/SHOULD/COULD/REMOVE) | `id (UUID)` | `project_id -> projects(id)` | `ENABLE RLS: EXISTS(projects.user_id = auth.uid())` |
| `project_risks` | Risk severity, probability, and mitigations | `id (UUID)` | `project_id -> projects(id)` | `ENABLE RLS: EXISTS(projects.user_id = auth.uid())` |
| `project_roadmap` | 4-phase weekly build tasks & status tracking | `id (UUID)` | `project_id -> projects(id)` | `ENABLE RLS: EXISTS(projects.user_id = auth.uid())` |
| `mentor_messages` | Context-synced AI mentor chat history | `id (UUID)` | `project_id -> projects(id)`, `user_id -> auth.users(id)` | `ENABLE RLS: auth.uid() = user_id` |
| `github_connections` | Encrypted OAuth tokens & scopes | `id (UUID)` | `user_id -> auth.users(id)` | `ENABLE RLS: auth.uid() = user_id` |
| `publish_jobs` | Auto-repo creation & deployment job logs | `id (UUID)` | `user_id -> auth.users(id)`, `project_id -> projects(id)` | `ENABLE RLS: auth.uid() = user_id` |
| `deployment_configs` | Vercel / Render build options & framework | `id (UUID)` | `project_id -> projects(id)` | `ENABLE RLS: EXISTS(projects.user_id = auth.uid())` |
| `deployment_env_vars` | Environment variables requirements & secret flags | `id (UUID)` | `project_id -> projects(id)` | `ENABLE RLS: EXISTS(projects.user_id = auth.uid())` |

## 3. Security Guarantee
- Every table executes `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;`.
- Unauthenticated requests are rejected by PostgreSQL kernel RLS rules.
