-- ====================================================================
-- PROJECTFORGE AI — COMPLETE POSTGRESQL SCHEMA + ROW LEVEL SECURITY (RLS)
-- PromptWars Qualification V2 Edition (Auto GitHub & Deployment)
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. STUDENT PROFILES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  field TEXT NOT NULL,
  degree TEXT NOT NULL,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  interests JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience TEXT NOT NULL DEFAULT 'intermediate',
  team_size INT NOT NULL DEFAULT 1,
  timeline_months INT NOT NULL DEFAULT 4,
  budget TEXT NOT NULL DEFAULT 'free',
  hardware TEXT NOT NULL DEFAULT 'standard_laptop',
  career_goal TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'balanced_innovation',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON public.student_profiles(user_id);

-- --------------------------------------------------------------------
-- 2. PROJECTS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  required_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  complexity INT NOT NULL DEFAULT 5,
  skill_fit_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  feasibility_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  innovation_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  career_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  demo_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  risk_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  overall_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'candidate', -- candidate, selected, rescued, archived
  blueprint_data JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- --------------------------------------------------------------------
-- 3. PROJECT FEATURES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'MUST HAVE', -- MUST HAVE, SHOULD HAVE, COULD HAVE, REMOVE
  complexity TEXT DEFAULT 'medium',
  estimated_days INT DEFAULT 3,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_features_project_id ON public.project_features(project_id);

-- --------------------------------------------------------------------
-- 4. PROJECT RISKS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_risks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  risk TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  probability TEXT NOT NULL DEFAULT 'medium',
  impact TEXT NOT NULL,
  mitigation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_risks_project_id ON public.project_risks(project_id);

-- --------------------------------------------------------------------
-- 5. PROJECT ROADMAP TASKS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_roadmap (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase TEXT NOT NULL,
  task TEXT NOT NULL,
  description TEXT,
  estimated_days INT DEFAULT 2,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, in_progress, completed, blocked
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_roadmap_project_id ON public.project_roadmap(project_id);

-- --------------------------------------------------------------------
-- 6. MENTOR MESSAGES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mentor_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mentor_messages_project_user ON public.mentor_messages(project_id, user_id);

-- --------------------------------------------------------------------
-- 7. GITHUB CONNECTIONS (V2)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.github_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  provider TEXT NOT NULL DEFAULT 'github',
  provider_user_id TEXT,
  encrypted_token TEXT NOT NULL,
  scopes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_github_connections_user_id ON public.github_connections(user_id);

-- --------------------------------------------------------------------
-- 8. PUBLISH JOBS (V2)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.publish_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- vercel, render, netlify
  status TEXT NOT NULL DEFAULT 'pending', -- pending, creating_repo, pushing_files, deploying, live, failed
  repository_url TEXT,
  deployment_url TEXT,
  provider_project_id TEXT,
  commit_sha TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_publish_jobs_user_project ON public.publish_jobs(user_id, project_id);

-- --------------------------------------------------------------------
-- 9. DEPLOYMENT CONFIGS (V2)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.deployment_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  repository_name TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'main',
  framework TEXT DEFAULT 'nextjs',
  build_command TEXT DEFAULT 'npm run build',
  output_directory TEXT DEFAULT '.next',
  root_directory TEXT DEFAULT '/',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deployment_configs_project_id ON public.deployment_configs(project_id);

-- --------------------------------------------------------------------
-- 10. DEPLOYMENT ENV VARS (V2)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.deployment_env_vars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  key TEXT NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT true,
  is_secret BOOLEAN NOT NULL DEFAULT false,
  configured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deployment_env_vars_project_id ON public.deployment_env_vars(project_id);


-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict isolation: users can ONLY access their own records.
-- ====================================================================

-- 1. Student Profiles RLS
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON public.student_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
  ON public.student_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON public.student_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- 2. Projects RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" 
  ON public.projects FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" 
  ON public.projects FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" 
  ON public.projects FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" 
  ON public.projects FOR DELETE 
  USING (auth.uid() = user_id);

-- 3. Project Features RLS
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage features of owned projects" 
  ON public.project_features FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_features.project_id AND projects.user_id = auth.uid()));

-- 4. Project Risks RLS
ALTER TABLE public.project_risks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage risks of owned projects" 
  ON public.project_risks FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_risks.project_id AND projects.user_id = auth.uid()));

-- 5. Project Roadmap RLS
ALTER TABLE public.project_roadmap ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage roadmap of owned projects" 
  ON public.project_roadmap FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_roadmap.project_id AND projects.user_id = auth.uid()));

-- 6. Mentor Messages RLS
ALTER TABLE public.mentor_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view mentor messages of owned projects" 
  ON public.mentor_messages FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert mentor messages for owned projects" 
  ON public.mentor_messages FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 7. GitHub Connections RLS
ALTER TABLE public.github_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own github connections" 
  ON public.github_connections FOR ALL 
  USING (auth.uid() = user_id);

-- 8. Publish Jobs RLS
ALTER TABLE public.publish_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own publish jobs" 
  ON public.publish_jobs FOR ALL 
  USING (auth.uid() = user_id);

-- 9. Deployment Configs RLS
ALTER TABLE public.deployment_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage deployment configs of owned projects" 
  ON public.deployment_configs FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = deployment_configs.project_id AND projects.user_id = auth.uid()));

-- 10. Deployment Env Vars RLS
ALTER TABLE public.deployment_env_vars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage env vars of owned projects" 
  ON public.deployment_env_vars FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = deployment_env_vars.project_id AND projects.user_id = auth.uid()));
