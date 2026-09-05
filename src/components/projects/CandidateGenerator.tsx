"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Compass, CheckCircle2, ArrowRight, BarChart2, ShieldAlert, Cpu, Layers, Code2, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useProfile } from "@/context/ProfileContext";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { calculateDeterministicHealthScore, ScoreBreakdown } from "@/lib/scoring/engine";
import { HealthScoreCard } from "@/components/scoring/HealthScoreCard";
import { compareProjectCandidates, ProjectComparisonAnalysis } from "@/lib/scoring/comparison";
import { ProjectComparison } from "./ProjectComparison";
import { StudentProfileInput } from "@/lib/validation/profile";

export function CandidateGenerator() {
  const { profile: contextProfile, isProfileComplete } = useProfile();
  const [activeProfile, setActiveProfile] = useState<StudentProfileInput | null>(contextProfile);
  
  const [generating, setGenerating] = useState(false);
  const [candidates, setCandidates] = useState<AIProjectCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<AIProjectCandidate | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);
  const [comparisonAnalysis, setComparisonAnalysis] = useState<ProjectComparisonAnalysis | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "matrix">("cards");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Read latest saved profile from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem("projectforge_student_profile");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setActiveProfile(parsed);
      } catch {
        setActiveProfile(contextProfile);
      }
    } else {
      setActiveProfile(contextProfile);
    }
  }, [contextProfile]);

  const handleGenerate = async () => {
    // Re-read latest profile
    let currentProfile = activeProfile;
    const cached = localStorage.getItem("projectforge_student_profile");
    if (cached) {
      try {
        currentProfile = JSON.parse(cached);
        setActiveProfile(currentProfile);
      } catch {
        // fallback
      }
    }

    if (!currentProfile) return;
    setGenerating(true);
    setSelectedCandidate(null);
    setScoreBreakdown(null);

    try {
      const res = await fetch("/api/projects/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProfile),
      });

      const data = await res.json();
      if (data.success && data.projects) {
        setCandidates(data.projects);
        
        // Run Side-by-Side Comparison Analysis
        const analysis = compareProjectCandidates(currentProfile, data.projects);
        setComparisonAnalysis(analysis);
      }
    } catch (err) {
      console.error("Candidate generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectCandidate = (cand: AIProjectCandidate) => {
    setSelectedCandidate(cand);
    const p = activeProfile || contextProfile;
    if (p) {
      const calculated = calculateDeterministicHealthScore(p, cand);
      setScoreBreakdown(calculated);
    }
  };

  const filteredCandidates = candidates.filter((cand) => {
    if (categoryFilter === "All") return true;
    if (categoryFilter === "Feasible MVPs") return cand.complexity <= 5;
    if (categoryFilter === "Advanced Systems") return cand.complexity > 5 && cand.complexity < 10;
    if (categoryFilter === "Scope Rescue Target") return cand.complexity === 10;
    return true;
  });

  const p = activeProfile || contextProfile;

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Active Profile Skills & Trigger */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Skill-Driven AI Project Candidates Generator</h2>
            <Badge variant="brand">8 Candidates Catalog</Badge>
          </div>
          {p ? (
            <div className="space-y-1">
              <p className="text-xs text-slate-300">
                Generating 8 candidates tailored to skills:{" "}
                <span className="font-mono text-cyan-300 font-bold">{p.skills.join(", ")}</span>
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Field: {p.field} • Goal: {p.career_goal} • Team: {p.team_size} Members • Timeline: {p.timeline_months} Months
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Complete student onboarding profile to generate candidates.</p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {candidates.length > 0 && (
            <div className="flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  viewMode === "cards" ? "bg-cyan-500/20 text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Cards View ({filteredCandidates.length})
              </button>
              <button
                onClick={() => setViewMode("matrix")}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  viewMode === "matrix" ? "bg-cyan-500/20 text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Matrix View
              </button>
            </div>
          )}

          <Link href="/onboarding">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Compass className="h-4 w-4" />
              <span>Edit Skills</span>
            </Button>
          </Link>

          <Button
            variant="rescue"
            size="md"
            disabled={generating}
            onClick={handleGenerate}
            className="gap-2 text-xs font-bold shadow-lg shadow-amber-500/10"
          >
            <Sparkles className="h-4 w-4 fill-current" />
            <span>{generating ? "Architecting 8 Candidates..." : "Generate Candidates From My Skills"}</span>
          </Button>
        </div>
      </div>

      {/* Loading state indicator */}
      {generating && (
        <div className="p-12 rounded-2xl border border-cyan-500/30 bg-slate-900/60 text-center space-y-3 shadow-glow-cyan animate-pulse">
          <div className="h-8 w-8 mx-auto rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <div className="text-sm font-semibold text-cyan-300">AI Architect Generating 8 Tailored Candidates...</div>
          <div className="text-xs text-slate-400 max-w-md mx-auto font-mono">
            Customizing project titles, problems, and tech stacks for: {p?.skills.join(", ")}.
          </div>
        </div>
      )}

      {/* Selected Project Health Score Breakdown Display */}
      {selectedCandidate && scoreBreakdown && p && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-cyan-400" />
              <span>Selected Project Evaluation: {selectedCandidate.title}</span>
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)} className="text-xs text-slate-400">
              Close Breakdown ×
            </Button>
          </div>

          <HealthScoreCard scoreBreakdown={scoreBreakdown} projectTitle={selectedCandidate.title} />
        </div>
      )}

      {/* Matrix View */}
      {viewMode === "matrix" && comparisonAnalysis && !generating && (
        <ProjectComparison analysis={comparisonAnalysis} onSelectProject={handleSelectCandidate} />
      )}

      {/* Cards View */}
      {viewMode === "cards" && candidates.length > 0 && !generating && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">8 Generated Candidates Tailored to Your Skills</h3>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Filter:
              </span>
              {["All", "Feasible MVPs", "Advanced Systems", "Scope Rescue Target"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    categoryFilter === cat
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 8 Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((cand) => {
              const isSelected = selectedCandidate?.id === cand.id;
              const isTop = comparisonAnalysis?.recommendedCandidate.candidate.id === cand.id;

              return (
                <Card
                  key={cand.id}
                  hoverEffect
                  glow={isSelected ? "cyan" : isTop ? "cyan" : "none"}
                  className={`flex flex-col justify-between transition-all ${
                    isSelected ? "border-cyan-400 bg-slate-900" : isTop ? "border-emerald-500/40 bg-slate-900/90" : "bg-slate-900/80 border-slate-800"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="indigo">Complexity {cand.complexity}/10</Badge>
                        {isTop && <Badge variant="success">#1 Top Recommended</Badge>}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{cand.features.length} Features</span>
                    </div>
                    <CardTitle className="text-base font-bold text-white mb-2 leading-snug">{cand.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-300 line-clamp-2">
                      {cand.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 text-xs">
                    {/* Problem & Solution */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div>
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Problem:</span>
                        <p className="text-slate-300 text-[11px] leading-tight">{cand.problem}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-900">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Solution:</span>
                        <p className="text-slate-300 text-[11px] leading-tight">{cand.solution}</p>
                      </div>
                    </div>

                    {/* Tech Badges matching student skills */}
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Technologies</span>
                      <div className="flex flex-wrap gap-1">
                        {cand.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-cyan-300 border border-slate-700 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* MUST HAVE Features preview */}
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Core MVP Features</span>
                      <div className="space-y-1">
                        {cand.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px] text-slate-300">
                            <span className="truncate flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                              {f.name}
                            </span>
                            <Badge variant={f.priority === "MUST HAVE" ? "success" : f.priority === "REMOVE" ? "danger" : "brand"} className="py-0 px-1 text-[9px]">
                              {f.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                    <Button
                      variant={isSelected ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handleSelectCandidate(cand)}
                      className="w-full text-xs gap-1.5 font-semibold"
                    >
                      {isSelected ? <CheckCircle2 className="h-3.5 w-3.5" /> : <BarChart2 className="h-3.5 w-3.5 text-cyan-400" />}
                      <span>{isSelected ? "Candidate Evaluated" : "Evaluate & Score Candidate"}</span>
                    </Button>

                    {cand.complexity === 10 ? (
                      <Link href="/rescue" className="w-full">
                        <Button variant="rescue" size="sm" className="w-full text-[11px] font-bold gap-1">
                          <ShieldAlert className="h-3.5 w-3.5" />
                          <span>Trigger Scope Explosion Rescue →</span>
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/blueprint" className="w-full">
                        <Button variant="ghost" size="sm" className="w-full text-[11px] text-cyan-400 hover:bg-cyan-500/10 gap-1">
                          <span>Generate Architecture Blueprint →</span>
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state prompt */}
      {candidates.length === 0 && !generating && (
        <Card className="bg-slate-900 border-slate-800 text-center p-12">
          <CardContent className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No Project Candidates Generated Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Click "Generate Candidates From My Skills" above to generate 8 tailored project options based on your profile skills ({p?.skills?.join(", ") || "Python, React"}).
              </p>
            </div>
            <Button variant="rescue" size="md" onClick={handleGenerate} className="gap-2 text-xs font-bold">
              <Sparkles className="h-4 w-4 fill-current" />
              <span>Generate 8 Skill-Based Candidates Now</span>
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
