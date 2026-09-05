import React from "react";
import { UserCheck, Sparkles, BarChart2, ShieldAlert, FileCode2, Map, MessageSquare, Github, Rocket, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function WorkflowSection() {
  const steps = [
    { num: "01", title: "Student Profile", desc: "Skills, constraints, hardware, timeline", icon: UserCheck },
    { num: "02", title: "Generate Ideas", desc: "5-8 tailored project candidates", icon: Sparkles },
    { num: "03", title: "Score & Evaluate", desc: "Deterministic health calculation", icon: BarChart2 },
    { num: "04", title: "Scope Rescue", desc: "Rescope overambitious bloat into MVP", icon: ShieldAlert, highlight: true },
    { num: "05", title: "Technical Blueprint", desc: "Architecture, DB design, APIs, security", icon: FileCode2 },
    { num: "06", title: "Task Roadmap", desc: "Weekly build phases & progress tracking", icon: Map },
    { num: "07", title: "AI Mentor", desc: "Context-aware architectural guidance", icon: MessageSquare },
    { num: "08", title: "Publish GitHub", desc: "Auto-create repo & initial commit", icon: Github, v2: true },
    { num: "09", title: "Deploy Vercel/Render", desc: "1-Click environment & hosting setup", icon: Rocket, v2: true },
    { num: "10", title: "Live Application", desc: "Production URL & verified deployment", icon: CheckCircle2, success: true },
  ];

  return (
    <section className="py-20 bg-slate-950/80 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">End-to-End Hero Workflow</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The ProjectForge AI Journey
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            From zero clarity to live deployment URL without getting bogged down in DevOps.
          </p>
        </div>

        {/* 10-step timeline grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  step.highlight 
                    ? "bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5"
                    : step.v2
                      ? "bg-slate-900 border-indigo-500/40"
                      : step.success
                        ? "bg-slate-900 border-emerald-500/40 shadow-glow-cyan"
                        : "bg-slate-900/60 border-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{step.num}</span>
                    <Icon className={`h-4 w-4 ${
                      step.highlight ? "text-amber-400" : step.v2 ? "text-indigo-400" : step.success ? "text-emerald-400" : "text-cyan-400"
                    }`} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
