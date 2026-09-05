import React from "react";
import { Cpu, ShieldCheck, Compass, GitBranch, Rocket, MessageSquare, BarChart3, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function FeaturesGrid() {
  const features = [
    {
      icon: Compass,
      title: "Student Profile & Constraints",
      description: "Captures field, degree, programming languages, ML background, team size, budget, timeline, and hardware limits for hyper-tailored evaluation.",
      badge: "M3 Onboarding",
    },
    {
      icon: BarChart3,
      title: "Deterministic Scoring Engine",
      description: "6-factor formula (Skill Fit 25%, Feasibility 20%, Innovation 20%, Career 15%, Demo 10%, Risk 10%). Transparent, reliable math — not a mystery AI number.",
      badge: "M6 Engine",
    },
    {
      icon: ShieldCheck,
      title: "Scope Explosion Rescue",
      description: "Identifies feature overload, hardware dependency, and tech stack bloat. Classifies items as MUST / SHOULD / COULD / REMOVE to salvage deadline viability.",
      badge: "Hero Feature",
      highlight: true,
    },
    {
      icon: Layers,
      title: "Technical Blueprint Generator",
      description: "Produces functional requirements, recommended tech stack, DB schema, API design, security policies, deployment topology, and live demo flows.",
      badge: "M8 Spec",
    },
    {
      icon: GitBranch,
      title: "Auto GitHub Publishing",
      description: "Connects OAuth, creates repository, validates build setup, generates README/LICENSE, and pushes initial commits programmatically without manual Git steps.",
      badge: "V2 New",
      v2: true,
    },
    {
      icon: Rocket,
      title: "1-Click Deployment (Vercel/Render)",
      description: "Sends environment variables securely to Vercel or Render APIs, provisions hosting services, monitors build logs, and delivers live project URLs.",
      badge: "V2 New",
      v2: true,
    },
    {
      icon: MessageSquare,
      title: "Project-Aware AI Mentor",
      description: "Stays contextually synced with the student's profile, blueprint, risks, roadmap tasks, and progress to answer real engineering dilemmas.",
      badge: "M11 Mentor",
    },
    {
      icon: Cpu,
      title: "Built-in Demo Mode & Fixtures",
      description: "Pre-generated deterministic JSON fallbacks guarantee 100% hackathon presentation uptime even during API outages or wifi disruptions.",
      badge: "Zero Downtime",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="indigo" className="mb-3">Complete Platform Architecture</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Decision, Rescue & Execution
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            From project selection to live URL — ProjectForge AI delivers end-to-end intelligence and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                hoverEffect
                glow={feature.highlight ? "cyan" : feature.v2 ? "indigo" : "none"}
                className={feature.v2 ? "border-indigo-500/20 bg-slate-900/80" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${
                      feature.highlight 
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" 
                        : feature.v2 
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30" 
                          : "bg-slate-800 text-slate-300"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={feature.highlight ? "brand" : feature.v2 ? "indigo" : "slate"}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold text-white mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
