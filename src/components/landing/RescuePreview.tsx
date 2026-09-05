"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, CheckCircle2, XCircle, Sparkles, RefreshCw, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function RescuePreview() {
  const [isRescued, setIsRescued] = useState(false);

  return (
    <section className="py-16 bg-[#090d16] border-y border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="warning" className="mb-3 gap-1">
            <ShieldAlert className="h-3.5 w-3.5" />
            Hero Differentiator Module
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Scope Explosion Detection & AI Project Rescue
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Students pick impossible scope combinations (AI + Blockchain + IoT + Mobile + Real-time). ProjectForge diagnoses bloat and rescopes it into a buildable MVP.
          </p>
        </div>

        {/* Interactive Rescue Card */}
        <div className="max-w-4xl mx-auto rounded-xl bg-[#111726] border border-slate-800 p-6 sm:p-8 shadow-card">
          
          {/* Diagnostic Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg border ${
                isRescued ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Project Diagnostic State</span>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>Smart Health Monitoring & AI Diagnostic Platform</span>
                  <Badge variant={isRescued ? "success" : "danger"} className="text-[10px]">
                    {isRescued ? "BUILDABLE MVP" : "SCOPE EXPLOSION"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-4">
              <div className="text-right font-mono">
                <div className="text-[10px] text-slate-400">Health Score</div>
                <div className="text-2xl font-bold flex items-center justify-end gap-1">
                  <span className={isRescued ? "text-emerald-400" : "text-red-400"}>
                    {isRescued ? "86" : "43"}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">/100</span>
                </div>
              </div>

              <Button
                variant={isRescued ? "outline" : "rescue"}
                size="sm"
                onClick={() => setIsRescued(!isRescued)}
                className="gap-1.5 shrink-0 text-xs"
              >
                {isRescued ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset to Bloated Scope</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Trigger AI Scope Rescue</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Feature Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Original Overambitious Scope */}
            <div className={`p-4 rounded-xl border text-xs space-y-3 transition-all ${
              isRescued ? "bg-slate-950/40 border-slate-800/80 opacity-60" : "bg-slate-950 border-red-500/30"
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Original Scope (Overambitious)
                </span>
                <Badge variant="danger" className="text-[9px]">6 Overlapping Domains</Badge>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Custom IoT Wearable Hardware Sensor</span>
                  <span className="text-red-400 font-mono text-[10px] font-semibold">REMOVE (Hardware)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Ethereum Smart Contracts for Patient Data</span>
                  <span className="text-red-400 font-mono text-[10px] font-semibold">REMOVE (Blockchain)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Native iOS / Android Swift/Kotlin Apps</span>
                  <span className="text-red-400 font-mono text-[10px] font-semibold">REMOVE (Mobile)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>AI Patient Risk Prediction Model</span>
                  <span className="text-emerald-400 font-mono text-[10px] font-semibold">MUST HAVE</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Next.js Web Analytics Dashboard</span>
                  <span className="text-emerald-400 font-mono text-[10px] font-semibold">MUST HAVE</span>
                </div>
              </div>
            </div>

            {/* Right: Rescoped Buildable Architecture */}
            <div className={`p-4 rounded-xl border text-xs space-y-3 transition-all ${
              isRescued ? "bg-slate-950 border-emerald-500/30 shadow-glow-subtle" : "bg-slate-950/40 border-slate-800/80"
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Rescoped Buildable Architecture
                </span>
                <Badge variant={isRescued ? "success" : "slate"} className="text-[9px]">4-Week Feasible Scope</Badge>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    AI Patient Risk Prediction Model (Python/FastAPI)
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">MUST HAVE</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Next.js + React Analytics Dashboard
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">MUST HAVE</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Simulated Sensor Stream Generator
                  </span>
                  <span className="text-cyan-400 font-mono text-[10px]">SHOULD HAVE</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Automated SMS Notification Dispatch
                  </span>
                  <span className="text-indigo-400 font-mono text-[10px]">COULD HAVE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom callout */}
          <div className="mt-6 p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                {isRescued 
                  ? "Project rescued! Skill fit increased by +35%, timeline risk eliminated." 
                  : "Click 'Trigger AI Scope Rescue' above to test the rescope engine."}
              </span>
            </div>
            <Link href="/rescue">
              <span className="text-cyan-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                View Full Rescue Tool <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
