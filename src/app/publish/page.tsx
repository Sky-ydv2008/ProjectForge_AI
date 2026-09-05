"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GitHubConnectCard } from "@/components/publish/GitHubConnectCard";
import { PreflightChecklist } from "@/components/publish/PreflightChecklist";
import { GitHubPublisher } from "@/components/publish/GitHubPublisher";
import { DeploymentSelector } from "@/components/publish/DeploymentSelector";
import { Rocket, ShieldCheck, Github } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function PublishPage() {
  const [publishedRepoUrl, setPublishedRepoUrl] = useState("https://github.com/alex-chen-dev/medforge-ai-diagnostic");

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">Publish Center & One-Click Deployment</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              V2 System: Connect GitHub, auto-create repository, push project files, and deploy live.
            </p>
          </div>
          <Badge variant="indigo">M14 Vercel & Render Deployment Ready</Badge>
        </div>

        {/* Top Grid: GitHub OAuth + Preflight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GitHubConnectCard />
          <PreflightChecklist />
        </div>

        {/* Automatic GitHub Repository Publisher */}
        <GitHubPublisher onRepoPublished={(url) => setPublishedRepoUrl(url)} />

        {/* One-Click Deployment Adapter (Vercel / Render) */}
        <DeploymentSelector repositoryUrl={publishedRepoUrl} />

      </div>
    </ProtectedRoute>
  );
}
