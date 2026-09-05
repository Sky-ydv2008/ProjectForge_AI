import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PitchBanner() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-background border-t border-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-3 block">
              Hackathon Hero Positioning
            </span>

            <blockquote className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-snug">
              “ProjectForge doesn&apos;t just tell students what to build. <br className="hidden sm:inline" />
              <span className="text-gradient">It helps them decide, plan, rescue, publish and ship it.”</span>
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Zero Hallucinated Health Scores
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Automatic GitHub Repo Creation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                Live Vercel/Render Hosting
              </span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding">
                <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-glow-cyan font-bold">
                  <span>Launch ProjectForge AI</span>
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
