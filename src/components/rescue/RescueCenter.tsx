"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, Zap, ArrowRight, CheckCircle2, XCircle, RefreshCw, Sparkles, Cpu, Layers, BarChart3, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useProfile } from "@/context/ProfileContext";
import { rescueProjectScope, RescueResult, OVERAMBITIOUS_DEMO_PROJECT } from "@/lib/scoring/rescue-engine";

export function RescueCenter() {
  const { profile } = useProfile();
  const [isRescued, setIsRescued] = useState(false);
  const [rescuing, setRescuing] = useState(false);

  // Compute rescue result for profile
  const rescueData: RescueResult = rescueProjectScope(
    profile || {
      field: "Computer Science & AI",
      degree: "B.Tech CS 7th Sem",
      skills: ["Python", "React", "TypeScript", "FastAPI"],
      interests: ["Healthcare AI"],
      experience: "intermediate",
      team_size: 3,
      timeline_months: 4,
      budget: "free",
      hardware: "standard_laptop",
      career_goal: "AI Engineer",
      difficulty: "balanced_innovation",
    },
    OVERAMBITIOUS_DEMO_PROJECT
  );

  const activeResult = isRescued ? rescueData.rescuedScore : rescueData.originalScore;

  const handleTriggerRescue = () => {
    setRescuing(true);
    setTimeout(() => {
      setIsRescued(true);
      setRescuing(false);
    }, 600);
  };

  const handleReset = () => {
    setIsRescued(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Diagnostic Header */}
      <div className={`p-6 rounded-2xl border transition-all shadow-2xl ${
        isRescued 
          ? "bg-slate-900 border-emerald-500/40 shadow-glow-cyan"
          : "bg-slate-900 border-red-500/40 shadow-glow-danger"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl shrink-0 ${
              isRescued ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse"
            }`}>
              <ShieldAlert className="h-8 w-8 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={isRescued ? "success" : "danger"} className="text-xs">
                  {isRescued ? "BUILDABLE MVPsalvaged" : "SCOPE EXPLOSION DETECTED"}
                </Badge>
                <span className="text-xs font-mono text-slate-400">Hero Differentiator Module</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {isRescued ? rescueData.rescuedCandidate.title : rescueData.originalCandidate.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {isRescued ? rescueData.rescueSummary : rescueData.diagnosisReason}
              </p>
            </div>
          </div>

          {/* Large Score Indicator & Trigger CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Health Score</div>
              <div className="text-4xl font-extrabold font-mono flex items-center justify-end gap-1">
                <span className={isRescued ? "text-emerald-400" : "text-red-400 animate-pulse"}>
                  {activeResult.overallScore}
                </span>
                <span className="text-sm text-slate-500 font-normal">/100</span>
              </div>
            </div>

            <Button
              variant={isRescued ? "outline" : "rescue"}
              size="md"
              disabled={rescuing}
              onClick={isRescued ? handleReset : handleTriggerRescue}
              className="gap-2 text-xs font-bold shadow-lg"
            >
              {isRescued ? (
                <>
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset to Bloated Scope</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-current" />
                  <span>{rescuing ? "Rescoping Bloat..." : "Trigger AI Scope Rescue (43 → 86)"}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Before / After Metrics Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`transition-all ${!isRescued ? "border-red-500/40 bg-slate-900" : "bg-slate-900/60 border-slate-800"}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Skill Fit Rating</span>
              <Badge variant={isRescued ? "success" : "danger"}>
                {isRescued ? `${rescueData.rescuedScore.dimensions.skillFit.score}%` : `${rescueData.originalScore.dimensions.skillFit.score}%`}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold text-white mt-1">
              {isRescued ? "100% Skill Alignment" : "Skill Gap Overload"}
            </CardTitle>
            <CardDescription className="text-xs">
              {isRescued
                ? "Stripped Solidity & Swift requirements. 100% of remaining stack uses Python & React."
                : "Missing 3 required skills (Solidity, Swift, C++ Embedded hardware)."}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`transition-all ${isRescued ? "border-emerald-500/40 bg-slate-900 shadow-glow-cyan" : "bg-slate-900/60 border-slate-800"}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Feasibility Rating</span>
              <Badge variant={isRescued ? "success" : "danger"}>
                {isRescued ? `${rescueData.rescuedScore.dimensions.feasibility.score}%` : `${rescueData.originalScore.dimensions.feasibility.score}%`}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold text-white mt-1">
              {isRescued ? "Buildable 12-Day Scope" : "41-Day Deadline Risk"}
            </CardTitle>
            <CardDescription className="text-xs">
              {isRescued
                ? "Rescoped build volume fits well within 4-month timeline."
                : "41 build days required for 3-person team exceeds student semester capacity."}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`transition-all ${isRescued ? "border-indigo-500/40 bg-slate-900" : "bg-slate-900/60 border-slate-800"}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Hardware Risk</span>
              <Badge variant={isRescued ? "success" : "danger"}>
                {isRescued ? "Zero Hardware Risk" : "High Severity"}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold text-white mt-1">
              {isRescued ? "Simulated Mock Sensors" : "Custom IoT Hardware"}
            </CardTitle>
            <CardDescription className="text-xs">
              {isRescued
                ? "Replaced physical sensors with JSON stream generator."
                : "Microcontroller soldering defect or supply chain delay halts project."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Feature Pruning Matrix Side-by-Side Table */}
      <Card glow="cyan" className="bg-slate-900 border-slate-800 overflow-hidden">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <span>Scope Explosion Feature Priority Matrix (MUST / SHOULD / COULD / REMOVE)</span>
            </CardTitle>
            <Badge variant="warning">Hero Feature Transformation</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column 1: Stripped Scope Bloat (REMOVE) */}
            <div className="p-5 rounded-xl bg-slate-950 border border-red-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span>Stripped Scope Bloat (REMOVE)</span>
                </h4>
                <Badge variant="danger">3 Dependencies Removed</Badge>
              </div>

              <div className="space-y-3 text-xs">
                {rescueData.strippedFeatures.map((sf, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{sf.name}</span>
                      <Badge variant="danger" className="text-[9px]">REMOVE</Badge>
                    </div>
                    <p className="text-[11px] text-red-400">{sf.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Retained Buildable MVP Architecture */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Retained Buildable MVP Architecture</span>
                </h4>
                <Badge variant="success">4 Core MVP Components</Badge>
              </div>

              <div className="space-y-3 text-xs">
                {rescueData.retainedFeatures.map((rf, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-200 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      {rf.name}
                    </span>
                    <Badge variant={rf.priority === "MUST HAVE" ? "success" : rf.priority === "SHOULD HAVE" ? "brand" : "indigo"} className="text-[9px]">
                      {rf.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Project is now 100% buildable. Advance to Technical Architecture Blueprint & Auto GitHub Publishing.
            </div>

            <Link href="/blueprint">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-glow-cyan text-sm font-bold gap-2">
                <span>Launch Rescued Blueprint →</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
