"use client";

import React from "react";
import Link from "next/link";
import { Printer, ArrowLeft, Hammer, ShieldCheck, Cpu, Rocket, BarChart3, Database, Lock, Code2, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function PdfSpecPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans print:bg-white print:text-black">
      
      {/* Top Action Bar (Hidden during PDF print) */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#07090e]/95 px-6 py-4 flex items-center justify-between backdrop-blur-md print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">ProjectForge AI Architecture & Jury Specification</span>
            <Badge variant="brand" className="text-[10px]">PDF Print Ready</Badge>
          </div>
        </div>

        <Button variant="rescue" size="md" onClick={handlePrint} className="gap-2 text-xs font-bold shadow-lg">
          <Printer className="h-4 w-4" />
          <span>🖨️ Download / Save as PDF</span>
        </Button>
      </header>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8 print:p-0 print:max-w-full print:space-y-6">
        
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 print:border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold print:bg-black print:text-white">
                <Hammer className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white print:text-black">ProjectForge AI</span>
            </div>
            <span className="text-xs font-mono text-slate-400 print:text-gray-600">Document ID: SPEC-V2-2026</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight">
            System Architecture & Jury Presentation Specification
          </h1>
          <p className="text-sm text-slate-300 print:text-gray-700 mt-2">
            Official PromptWars Qualification Edition — V2 Auto GitHub Publishing & One-Click Cloud Deployment
          </p>

          <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 print:bg-gray-100 print:border-gray-300 text-xs font-mono text-cyan-300 print:text-black">
            “Don&apos;t just generate a project. Build the right one — then ship it.”
          </div>
        </div>

        {/* Section 1: Product Positioning & Core Thesis */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <Layers className="h-5 w-5 text-cyan-400 print:text-black" />
            <span>1. Product Positioning & Core Thesis</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300 space-y-1">
              <span className="font-bold text-cyan-400 print:text-black uppercase text-[10px]">Decision Differentiator</span>
              <p className="text-slate-300 print:text-gray-800">
                “We don&apos;t give students more project ideas — we help them make better project decisions based on skills, timeline, and capacity.”
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300 space-y-1">
              <span className="font-bold text-emerald-400 print:text-black uppercase text-[10px]">Execution Differentiator (V2)</span>
              <p className="text-slate-300 print:text-gray-800">
                “From project idea to live URL without making the student become a DevOps engineer.”
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 3-Tier System Architecture Topology */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <Cpu className="h-5 w-5 text-cyan-400 print:text-black" />
            <span>2. 3-Tier System Architecture Topology</span>
          </h2>
          <div className="p-4 rounded-xl bg-black border border-slate-800 print:bg-gray-100 print:border-gray-300 font-mono text-xs text-emerald-400 print:text-black space-y-2">
            <div className="text-slate-500 print:text-gray-600 text-[10px]">DECOUPLED 3-TIER MICRO-SERVICE TOPOLOGY DIAGRAM</div>
            <pre className="overflow-x-auto leading-tight py-2">
{`[ Client Browser / Student UI ]  --->  [ Next.js 14 App Router (Vercel Edge) ]
                                         | (Zod Payload Validation & XSS Sanitization)
                                         v
                            [ FastAPI ML Microservice (Render Cloud) ]
                                         |
                                         +---> [ XGBoost Model Inference Engine ]
                                         |
                                         v
                            [ Supabase PostgreSQL + RLS ] <---> [ Redis Cache Tier ]`}
            </pre>
          </div>
        </section>

        {/* Section 3: Deterministic 6-Factor Health Scoring Formula */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <BarChart3 className="h-5 w-5 text-indigo-400 print:text-black" />
            <span>3. Deterministic 6-Factor Health Scoring Math Engine</span>
          </h2>
          <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300 space-y-3 text-xs">
            <div className="font-mono text-cyan-300 print:text-black font-bold">
              Overall Health = (SkillFit × 0.25) + (Feasibility × 0.20) + (Innovation × 0.20) + (Career × 0.15) + (Demo × 0.10) + (Risk × 0.10)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-300 print:text-gray-800">
              <div>• Skill Fit: 25% Weight</div>
              <div>• Feasibility: 20% Weight</div>
              <div>• Innovation: 20% Weight</div>
              <div>• Career Value: 15% Weight</div>
              <div>• Demo Potential: 10% Weight</div>
              <div>• Risk Adjustment: 10% Weight</div>
            </div>
          </div>
        </section>

        {/* Section 4: Hero Feature — Scope Explosion Detection & AI Rescue */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <ShieldCheck className="h-5 w-5 text-amber-400 print:text-black" />
            <span>4. Scope Explosion Detection & AI Rescue Transformation</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-red-500/30 print:bg-red-50 print:border-red-300 space-y-2">
              <span className="font-bold text-red-400 print:text-red-700 text-[10px] uppercase">Diagnosed Scope Explosion (43/100)</span>
              <p className="text-slate-300 print:text-gray-800">
                AI + Ethereum Blockchain + Custom IoT Microcontroller Hardware + Dual Swift/Kotlin Native Mobile Apps.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 print:bg-emerald-50 print:border-emerald-300 space-y-2">
              <span className="font-bold text-emerald-400 print:text-emerald-700 text-[10px] uppercase">Recalibrated Rescued MVP (86/100)</span>
              <p className="text-slate-300 print:text-gray-800">
                Strips hardware soldering, smart contracts, and dual mobile apps $\rightarrow$ Retains Python ML Risk Model + Next.js Web Dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: 8-Tab Technical Architecture Blueprint Specification */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <Code2 className="h-5 w-5 text-cyan-400 print:text-black" />
            <span>5. 8-Tab Technical Architecture Specification</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">1. Overview Spec</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">2. System Topology</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">3. Priority Matrix</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">4. Recommended Stack</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">5. Relational DB Design</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">6. REST API Endpoints</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">7. Security & RLS</div>
            <div className="p-3 rounded-lg bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300">8. Deployment & Demo</div>
          </div>
        </section>

        {/* Section 6: Security & Row Level Security (RLS) Isolation */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <Lock className="h-5 w-5 text-emerald-400 print:text-black" />
            <span>6. Security & Row Level Security (RLS) Model</span>
          </h2>
          <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800 print:bg-gray-50 print:border-gray-300 space-y-2 text-xs">
            <div className="text-slate-200 print:text-gray-800">• 10 PostgreSQL tables enforce <code className="text-cyan-400 print:text-black font-mono">ENABLE ROW LEVEL SECURITY</code> (<code className="text-cyan-400 print:text-black font-mono">auth.uid() = user_id</code>).</div>
            <div className="text-slate-200 print:text-gray-800">• Zero client-side secret leakage (all API keys execute server-side).</div>
            <div className="text-slate-200 print:text-gray-800">• Zod schema validation enforced on 100% of payloads.</div>
          </div>
        </section>

        {/* Section 7: 2-Minute Hackathon Presentation Script */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-gray-300 pb-2">
            <Rocket className="h-5 w-5 text-emerald-400 print:text-black" />
            <span>7. 2-Minute Hackathon Jury Presentation Script Flow</span>
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300 flex items-center gap-3">
              <span className="font-mono font-bold text-cyan-400 print:text-black">0:00 - 0:30</span>
              <span className="text-slate-300 print:text-gray-800">Hook: State the student project selection & scope bloat problem.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300 flex items-center gap-3">
              <span className="font-mono font-bold text-cyan-400 print:text-black">0:30 - 1:00</span>
              <span className="text-slate-300 print:text-gray-800">Scope Rescue: Trigger live AI Scope Rescue (43 → 86 score jump).</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300 flex items-center gap-3">
              <span className="font-mono font-bold text-cyan-400 print:text-black">1:00 - 1:30</span>
              <span className="text-slate-300 print:text-gray-800">Blueprint & Mentor: Show 8-tab Technical Blueprint & AI Mentor.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300 flex items-center gap-3">
              <span className="font-mono font-bold text-cyan-400 print:text-black">1:30 - 2:00</span>
              <span className="text-slate-300 print:text-gray-800">Auto-Ship: Auto GitHub Repo Creation & One-Click Cloud Deployment.</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
