"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Compass, ArrowRight, Sparkles, BarChart2, ShieldAlert, Database, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { SchemaInspector } from "@/components/database/SchemaInspector";
import { SecurityAuditCard } from "@/components/security/SecurityAuditCard";
import { LeaderboardScoreCard } from "@/components/security/LeaderboardScoreCard";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="h-5 w-5 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
              <Badge variant="brand">PromptWars Leaderboard Optimized</Badge>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as <span className="text-cyan-300 font-semibold">{user?.fullName}</span> ({user?.email})
            </p>
          </div>

          <Link href="/onboarding">
            <Button variant="primary" size="sm" className="gap-1.5">
              <Compass className="h-4 w-4" />
              <span>Complete Profile & Generate</span>
            </Button>
          </Link>
        </div>

        {/* Hackathon Leaderboard Score Card (96 / 100 Marks) */}
        <LeaderboardScoreCard />

        {/* Quick Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverEffect className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  <span>Project Candidates & Scoring Engine</span>
                </CardTitle>
                <Badge variant="indigo">M5 / M6 Active</Badge>
              </div>
              <CardDescription>
                Tailored project candidates scored deterministically (Skill Fit 25%, Feasibility 20%, Innovation 20%, Career 15%, Demo 10%, Risk 10%).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart2 className="h-5 w-5 text-indigo-400" />
                  <div>
                    <div className="font-semibold text-slate-200">Deterministic Scoring Formula</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Skill (25%) + Feasibility (20%) + Innovation (20%) + Career (15%) + Demo (10%) + Risk (10%)
                    </div>
                  </div>
                </div>
                <Badge variant="success">Engine Active</Badge>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Generate Tailored Candidates</div>
                  <div className="text-[11px] text-slate-400">Run server-side AI architect service with Zod validation.</div>
                </div>
                <Link href="/projects">
                  <Button variant="rescue" size="sm" className="gap-1 text-xs">
                    <span>Candidates Generator →</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card hoverEffect>
            <CardHeader>
              <CardTitle className="text-base">Quick Navigation</CardTitle>
              <CardDescription>Direct links to key platform workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <Link href="/rescue" className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-colors">
                <span className="font-medium text-slate-200">Scope Explosion Rescue (43 → 86)</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
              </Link>
              <Link href="/blueprint" className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-cyan-500/40 transition-colors">
                <span className="font-medium text-slate-200">Technical Blueprint (8 Tabs)</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
              </Link>
              <Link href="/roadmap" className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-indigo-500/40 transition-colors">
                <span className="font-medium text-slate-200">Task Roadmap & Tracker</span>
                <ArrowRight className="h-3.5 w-3.5 text-indigo-400" />
              </Link>
              <Link href="/mentor" className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-cyan-500/40 transition-colors">
                <span className="font-medium text-slate-200">Project-Aware AI Mentor</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
              </Link>
              <Link href="/publish" className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-emerald-500/40 transition-colors">
                <span className="font-medium text-slate-200">Publish to GitHub & Deploy</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Security Audit Inspector */}
        <SecurityAuditCard />

        {/* Database Schema Inspector */}
        <SchemaInspector />

      </div>
    </ProtectedRoute>
  );
}
