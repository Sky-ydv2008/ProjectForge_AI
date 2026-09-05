import React from "react";
import Link from "next/link";
import { Hammer, Github, ExternalLink, Shield, Cpu, Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-indigo-600">
                <Hammer className="h-4 w-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                ProjectForge<span className="text-cyan-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI Project Architect & Rescue Mentor. Helping final-year students evaluate, rescue, blueprint, publish to GitHub, and deploy realistic projects.
            </p>
            <p className="text-[11px] font-mono text-cyan-400/90 italic">
              “Don’t just generate a project. Build the right one — then ship it.”
            </p>
          </div>

          {/* Col 2: Core Platform */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Platform Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/onboarding" className="hover:text-cyan-400 transition-colors">Student Profile & Constraints</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Project Candidates & Scoring</Link></li>
              <li><Link href="/rescue" className="hover:text-amber-400 transition-colors flex items-center gap-1">Scope Explosion Rescue <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">Hero</span></Link></li>
              <li><Link href="/blueprint" className="hover:text-cyan-400 transition-colors">Technical Architecture Blueprint</Link></li>
              <li><Link href="/roadmap" className="hover:text-cyan-400 transition-colors">Phase-by-Phase Roadmap</Link></li>
            </ul>
          </div>

          {/* Col 3: Shipping & Integration */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Auto-Ship V2</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/publish" className="hover:text-cyan-400 transition-colors flex items-center gap-1">GitHub Auto Publishing <Github className="h-3 w-3 inline" /></Link></li>
              <li><Link href="/publish" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Vercel & Render Deployment <Rocket className="h-3 w-3 inline text-cyan-400" /></Link></li>
              <li><Link href="/mentor" className="hover:text-cyan-400 transition-colors">Project-Aware AI Mentor</Link></li>
              <li><span className="text-slate-500 flex items-center gap-1">Deterministic Scoring Engine <Shield className="h-3 w-3 inline text-slate-500" /></span></li>
              <li><span className="text-slate-500 flex items-center gap-1">Built-in Demo Mode <Cpu className="h-3 w-3 inline text-slate-500" /></span></li>
            </ul>
          </div>

          {/* Col 4: Hackathon Positioning */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Hackathon Qualification</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              PromptWars V2 Auto GitHub & Deployment Edition. Engineered for 100% demo reliability with client-safe architecture.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              Score formula: <span className="text-cyan-400">Skill(25%)</span> + <span className="text-indigo-400">Feas(20%)</span> + <span className="text-emerald-400">Innov(20%)</span> + <span className="text-amber-400">Career(15%)</span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 ProjectForge AI — Built for PromptWars Hackathon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              M1 Foundation Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
