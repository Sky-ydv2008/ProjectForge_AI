"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Sparkles, Rocket, CheckCircle2, Cpu, Hammer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background radial glows & grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Announcement Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-medium mb-6 backdrop-blur-md shadow-glow-cyan animate-pulse">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-slate-300">PromptWars Qualification V2 Edition</span>
          <span className="h-3 w-[1px] bg-slate-700" />
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            Auto GitHub & 1-Click Deployment <Rocket className="h-3 w-3 inline" />
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Don’t just generate a project. <br className="hidden sm:inline" />
          <span className="text-gradient">Build the right one — then ship it.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          ProjectForge AI evaluates student skills, detects scope explosion in overambitious ideas, rescues unrealistic projects into realistic MVPs, and programmatically publishes to GitHub & deploys live.
        </p>

        {/* Hero Tagline highlight box */}
        <div className="mt-4 inline-block px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 font-mono text-sm">
          <span className="text-amber-400 font-bold">Hero Differentiator:</span> “We don't give students more project ideas — we help them make better project decisions.”
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/onboarding">
            <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-lg shadow-cyan-500/20 text-base">
              <span>Start Project Architect</span>
              <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>

          <Link href="/rescue">
            <Button size="lg" variant="rescue" className="w-full sm:w-auto text-base">
              <ShieldAlert className="h-5 w-5 text-slate-950 stroke-[2.5]" />
              <span>Explore Scope Rescue Demo</span>
            </Button>
          </Link>
        </div>

        {/* Hero Metric Pills */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-cyan-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">Deterministic Scoring Engine</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-amber-400 font-mono">43 → 86</div>
            <div className="text-xs text-slate-400 mt-1">Rescoped Health Score Bump</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-indigo-400 font-mono">Auto GitHub</div>
            <div className="text-xs text-slate-400 mt-1">Repo & Initial Commit Creation</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-emerald-400 font-mono">Vercel/Render</div>
            <div className="text-xs text-slate-400 mt-1">1-Click Live URL Deployment</div>
          </div>
        </div>

      </div>
    </section>
  );
}
