"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, CheckCircle2, BarChart3, ArrowRight, Zap, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScoreBreakdown } from "@/lib/scoring/engine";

interface HealthScoreCardProps {
  scoreBreakdown: ScoreBreakdown;
  projectTitle?: string;
  onTriggerRescue?: () => void;
}

export function HealthScoreCard({ scoreBreakdown, projectTitle, onTriggerRescue }: HealthScoreCardProps) {
  const { overallScore, healthCategory, colorTheme, dimensions, recommendation } = scoreBreakdown;

  const dims = [
    dimensions.skillFit,
    dimensions.feasibility,
    dimensions.innovation,
    dimensions.careerValue,
    dimensions.demoPotential,
    dimensions.riskAdjustment,
  ];

  return (
    <Card
      glow={colorTheme === "danger" ? "danger" : colorTheme === "warning" ? "none" : "cyan"}
      className="bg-slate-900 border-slate-800 shadow-2xl"
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-xl font-bold text-white">Project Health Score Diagnostic</CardTitle>
              <Badge variant={colorTheme === "danger" ? "danger" : colorTheme === "warning" ? "warning" : "success"}>
                {healthCategory}
              </Badge>
            </div>
            {projectTitle && <CardDescription className="text-xs text-slate-300">{projectTitle}</CardDescription>}
          </div>

          {/* Large Health Score Number */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Overall Health</div>
              <div className="text-4xl font-extrabold font-mono flex items-center justify-end gap-1">
                <span className={colorTheme === "danger" ? "text-red-400" : colorTheme === "warning" ? "text-amber-400" : "text-emerald-400"}>
                  {overallScore}
                </span>
                <span className="text-sm text-slate-500 font-normal">/100</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Transparent Formula Banner */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <Info className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>Formula: Skill (25%) + Feas (20%) + Innov (20%) + Career (15%) + Demo (10%) + Risk (10%)</span>
          </div>
          <Badge variant="brand" className="hidden sm:inline-flex text-[10px]">Deterministic Math</Badge>
        </div>

        {/* 6 Dimension Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {dims.map((d) => (
            <div key={d.name} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{d.name} <span className="text-slate-500 font-mono text-[10px]">({d.weight * 100}%)</span></span>
                  <span className={`font-mono font-bold ${
                    d.status === "excellent" ? "text-emerald-400" : d.status === "good" ? "text-cyan-400" : d.status === "warning" ? "text-amber-400" : "text-red-400"
                  }`}>
                    {d.score}/100
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all ${
                      d.status === "excellent" ? "bg-emerald-400" : d.status === "good" ? "bg-cyan-400" : d.status === "warning" ? "bg-amber-400" : "bg-red-400"
                    }`}
                    style={{ width: `${d.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">{d.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Callout */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          colorTheme === "danger" 
            ? "bg-red-500/10 border-red-500/30 text-red-300"
            : colorTheme === "warning"
              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
        }`}>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <span>{recommendation}</span>
          </div>

          {healthCategory === "SCOPE EXPLOSION DETECTED" && (
            <Link href="/rescue" className="shrink-0 w-full sm:w-auto">
              <Button variant="rescue" size="sm" onClick={onTriggerRescue} className="w-full gap-1.5 text-xs font-semibold">
                <Zap className="h-4 w-4 fill-current" />
                <span>Launch Scope Rescue →</span>
              </Button>
            </Link>
          )}
        </div>

      </CardContent>
    </Card>
  );
}
