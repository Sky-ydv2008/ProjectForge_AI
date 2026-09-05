"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Sparkles, Rocket, Check, Code2, Hammer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Organic background grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium mb-6">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span className="text-slate-300 font-mono">v2.0 Auto-Ship Edition</span>
          <span className="h-3 w-[1px] bg-slate-800" />
          <span className="text-slate-400">Auto GitHub Publishing & 1-Click Cloud Deployment</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Don’t just generate a project. <br className="hidden sm:inline" />
          <span className="text-gradient">Build the right one — then ship it.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ProjectForge AI evaluates student skills, diagnoses scope explosion in overambitious ideas, rescopes projects into buildable MVPs, and programmatically publishes to GitHub & deploys live.
        </p>

        {/* Tagline Box */}
        <div className="mt-6 inline-block px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm font-mono">
          <span className="text-cyan-400 font-bold">Core Thesis:</span> “We don't give students more project ideas — we help them make better project decisions.”
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/onboarding">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-xs font-bold gap-2">
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

        {/* Key Metrics Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xl font-bold text-white font-mono">Deterministic</div>
            <div className="text-xs text-slate-400 mt-1">6-Factor Application Scoring Engine</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xl font-bold text-amber-400 font-mono">43 → 86</div>
            <div className="text-xs text-slate-400 mt-1">Rescoped MVP Health Score Jump</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xl font-bold text-cyan-400 font-mono">Auto GitHub</div>
            <div className="text-xs text-slate-400 mt-1">Programmatic Repo & Commit Creation</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xl font-bold text-emerald-400 font-mono">Vercel & Render</div>
            <div className="text-xs text-slate-400 mt-1">1-Click Live URL Deployment</div>
          </div>
        </div>

      </div>
    </section>
  );
}
