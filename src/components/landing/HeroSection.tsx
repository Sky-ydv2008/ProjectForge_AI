"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Sparkles, Rocket, Check, Code2, Hammer, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d111c] border border-slate-800 text-xs font-medium mb-6 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-300 font-mono">v2.0 Auto-Ship Release</span>
          <span className="h-3 w-[1px] bg-slate-800" />
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            Auto GitHub & 1-Click Deployment <Rocket className="h-3 w-3 inline" />
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Don’t just generate a project. <br className="hidden sm:inline" />
          <span className="text-gradient">Build the right one — then ship it.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          ProjectForge AI evaluates student skills, diagnoses scope explosion in bloated ideas, rescopes projects into buildable MVPs, and programmatically publishes to GitHub & deploys live.
        </p>

        {/* Tagline Highlight Box */}
        <div className="mt-6 inline-block px-4 py-2.5 rounded-xl bg-[#0d111c] border border-slate-800 text-slate-200 text-xs sm:text-sm font-mono shadow-sm">
          <span className="text-amber-400 font-bold">Core Position:</span> “We don't give students more project ideas — we help them make better project decisions.”
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/onboarding">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-xs font-bold gap-2 shadow-glow-cyan">
              <span>Start Project Architect</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/rescue">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-xs font-semibold gap-2 border-slate-700/80">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <span>Explore Scope Rescue Demo</span>
            </Button>
          </Link>
        </div>

        {/* LinkedIn Showcase Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800/80 shadow-sm">
            <div className="text-xl font-bold text-white font-mono">100% Math</div>
            <div className="text-xs text-slate-400 mt-1">6-Factor Deterministic Engine</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800/80 shadow-sm">
            <div className="text-xl font-bold text-amber-400 font-mono">43 → 86</div>
            <div className="text-xs text-slate-400 mt-1">Rescoped Health Score Jump</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800/80 shadow-sm">
            <div className="text-xl font-bold text-cyan-400 font-mono">Auto GitHub</div>
            <div className="text-xs text-slate-400 mt-1">Programmatic Repo & Commit Push</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0d111c] border border-slate-800/80 shadow-sm">
            <div className="text-xl font-bold text-emerald-400 font-mono">Vercel / Render</div>
            <div className="text-xs text-slate-400 mt-1">1-Click Live Hosting URL</div>
          </div>
        </div>

      </div>
    </section>
  );
}
