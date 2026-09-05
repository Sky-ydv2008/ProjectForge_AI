"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, CheckCircle, XCircle, Sparkles, RefreshCw, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function RescuePreview() {
  const [isRescued, setIsRescued] = useState(false);

  return (
    <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="warning" className="mb-3 gap-1">
            <ShieldAlert className="h-3.5 w-3.5" />
            Hero Differentiator Interaction
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scope Explosion Detection & AI Project Rescue
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Students pick impossible combinations (AI + Blockchain + IoT + Mobile + Real-time). ProjectForge diagnoses the bloat and automatically rescopes it into a buildable MVP.
          </p>
        </div>

        {/* Interactive Rescue Showcase Card */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isRescued ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border border-red-500/30 text-red-400 animate-pulse"}`}>
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Project Health Diagnostic</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Smart Health Monitoring & AI Diagnostic Platform</span>
                  <Badge variant={isRescued ? "success" : "danger"}>
                    {isRescued ? "BUILDABLE MVP" : "SCOPE EXPLOSION DETECTED"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400">Deterministic Health Score</div>
                <div className="text-3xl font-extrabold font-mono flex items-center justify-end gap-1">
                  <span className={isRescued ? "text-emerald-400" : "text-red-400"}>
                    {isRescued ? "86" : "43"}
                  </span>
                  <span className="text-sm text-slate-500 font-normal">/100</span>
                </div>
              </div>

              <Button
                variant={isRescued ? "outline" : "rescue"}
                size="md"
                onClick={() => setIsRescued(!isRescued)}
                className="gap-2 shrink-0"
              >
                {isRescued ? (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset to Original Scope</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Trigger AI Scope Rescue</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Feature Priority Breakdown Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Original Overambitious Stack */}
            <div className={`p-5 rounded-xl border transition-all ${isRescued ? "bg-slate-900/40 border-slate-800 opacity-60" : "bg-slate-900 border-red-500/30 shadow-glow-danger"}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span>Original Scope (Overambitious)</span>
                </h4>
                <Badge variant="danger">6 Overlapping Domains</Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Custom IoT Wearable Hardware Sensor</span>
                  <span className="text-red-400 font-mono text-[11px] font-semibold">REMOVE (Hardware Mismatch)</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Ethereum Smart Contracts for Patient Data</span>
                  <span className="text-red-400 font-mono text-[11px] font-semibold">REMOVE (Overkill Complexity)</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Native iOS / Android Swift/Kotlin Apps</span>
                  <span className="text-red-400 font-mono text-[11px] font-semibold">REMOVE (Time Constraint)</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>AI Patient Risk Prediction Model</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-semibold">MUST HAVE</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-300">
                  <span>Next.js Web Monitoring Dashboard</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-semibold">MUST HAVE</span>
                </div>
              </div>
            </div>

            {/* Right: Rescoped MVP Architecture */}
            <div className={`p-5 rounded-xl border transition-all ${isRescued ? "bg-slate-900 border-emerald-500/30 shadow-glow-cyan" : "bg-slate-900/40 border-slate-800"}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Rescoped Buildable Architecture</span>
                </h4>
                <Badge variant={isRescued ? "success" : "slate"}>4-Week Feasible Scope</Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    AI Patient Risk Prediction Model (Python/FastAPI)
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px]">MUST HAVE</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Next.js + React Analytics Dashboard
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px]">MUST HAVE</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Mock Simulated Sensor Stream Generator
                  </span>
                  <span className="text-cyan-400 font-mono text-[11px]">SHOULD HAVE</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Automated Alert Notifications (Twilio/Email)
                  </span>
                  <span className="text-indigo-400 font-mono text-[11px]">COULD HAVE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Callout */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                {isRescued 
                  ? "Project rescued successfully! Skill fit increased by +35%, timeline risk eliminated." 
                  : "Click 'Trigger AI Scope Rescue' above to test the interactive rescope engine."}
              </span>
            </div>
            <Link href="/rescue">
              <span className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer">
                View Full Rescue Tool <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
