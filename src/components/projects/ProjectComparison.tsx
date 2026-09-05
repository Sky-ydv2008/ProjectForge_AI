"use client";

import React from "react";
import Link from "next/link";
import { Trophy, CheckCircle2, ShieldAlert, ArrowRight, BarChart3, Zap, Sparkles, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectComparisonAnalysis } from "@/lib/scoring/comparison";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";

interface ProjectComparisonProps {
  analysis: ProjectComparisonAnalysis;
  onSelectProject: (candidate: AIProjectCandidate) => void;
}

export function ProjectComparison({ analysis, onSelectProject }: ProjectComparisonProps) {
  const { results, recommendedCandidate, comparisonSummary } = analysis;

  return (
    <div className="space-y-6">
      
      {/* Top #1 Recommended Winner Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-glow-cyan">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
              <Trophy className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="success" className="gap-1 font-mono text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  #1 TOP RECOMMENDED CANDIDATE
                </Badge>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Score: {recommendedCandidate.scoreBreakdown.overallScore}/100
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{recommendedCandidate.candidate.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {recommendedCandidate.recommendationReason}
              </p>
            </div>
          </div>

          <Link href="/rescue">
            <Button variant="rescue" size="md" onClick={() => onSelectProject(recommendedCandidate.candidate)} className="shrink-0 gap-2 text-xs font-bold">
              <span>Select Winner & Generate Blueprint</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Side-by-Side Matrix Table */}
      <Card glow="cyan" className="bg-slate-900 border-slate-800 overflow-hidden">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <span>Side-by-Side Candidates Comparison Matrix</span>
            </CardTitle>
            <Badge variant="brand">Deterministic Scoring Matrix</Badge>
          </div>
          <CardDescription className="text-xs text-slate-400">
            Compare all generated project options across 6 score dimensions and constraint requirements.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-4 font-semibold text-slate-400 w-1/4">Evaluation Attribute</th>
                {results.map((res, idx) => (
                  <th key={res.candidate.id} className="p-4 font-semibold text-white w-1/4 border-l border-slate-800/60">
                    <div className="flex items-center gap-1.5 mb-1">
                      {res.isTopRecommended && (
                        <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                          <Trophy className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span className="font-bold truncate">Candidate 0{idx + 1}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal line-clamp-1">{res.candidate.title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              
              {/* Row 1: Overall Health Score */}
              <tr className="bg-slate-900/50">
                <td className="p-4 font-bold text-white">Overall Health Score</td>
                {results.map((res) => (
                  <td key={res.candidate.id} className="p-4 border-l border-slate-800/60 font-mono">
                    <div className="text-lg font-bold flex items-center gap-2">
                      <span className={res.scoreBreakdown.colorTheme === "danger" ? "text-red-400" : res.scoreBreakdown.colorTheme === "warning" ? "text-amber-400" : "text-emerald-400"}>
                        {res.scoreBreakdown.overallScore}/100
                      </span>
                      <Badge variant={res.scoreBreakdown.colorTheme} className="text-[9px] py-0">
                        {res.scoreBreakdown.healthCategory}
                      </Badge>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 2: Skill Fit (25%) */}
              <tr>
                <td className="p-4 text-slate-300 font-medium">Skill Fit (25% Weight)</td>
                {results.map((res) => (
                  <td key={res.candidate.id} className="p-4 border-l border-slate-800/60 font-mono">
                    <div className="text-slate-200 font-semibold">{res.scoreBreakdown.dimensions.skillFit.score}/100</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{res.scoreBreakdown.dimensions.skillFit.explanation}</div>
                  </td>
                ))}
              </tr>

              {/* Row 3: Feasibility (20%) */}
              <tr>
                <td className="p-4 text-slate-300 font-medium">Feasibility (20% Weight)</td>
                {results.map((res) => (
                  <td key={res.candidate.id} className="p-4 border-l border-slate-800/60 font-mono">
                    <div className="text-slate-200 font-semibold">{res.scoreBreakdown.dimensions.feasibility.score}/100</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{res.scoreBreakdown.dimensions.feasibility.explanation}</div>
                  </td>
                ))}
              </tr>

              {/* Row 4: Innovation (20%) */}
              <tr>
                <td className="p-4 text-slate-300 font-medium">Innovation (20% Weight)</td>
                {results.map((res) => (
                  <td key={res.candidate.id} className="p-4 border-l border-slate-800/60 font-mono">
                    <div className="text-slate-200 font-semibold">{res.scoreBreakdown.dimensions.innovation.score}/100</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Complexity {res.candidate.complexity}/10</div>
                  </td>
                ))}
              </tr>

              {/* Row 5: Primary Tech Stack */}
              <tr>
                <td className="p-4 text-slate-300 font-medium">Tech Stack</td>
                {results.map((res) => (
                  <td key={res.candidate.id} className="p-4 border-l border-slate-800/60">
                    <div className="flex flex-wrap gap-1">
                      {res.candidate.technologies.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-cyan-300 border border-slate-800 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 6: Required Action */}
              <tr className="bg-slate-950">
                <td className="p-4 font-bold text-white">Action</td>
                {results.map((res) => (
                  <td key={res.candidate.id} className="p-4 border-l border-slate-800/60">
                    {res.scoreBreakdown.healthCategory === "SCOPE EXPLOSION DETECTED" ? (
                      <Link href="/rescue">
                        <Button variant="rescue" size="sm" onClick={() => onSelectProject(res.candidate)} className="w-full text-xs gap-1">
                          <Zap className="h-3.5 w-3.5 fill-current" />
                          <span>Rescue Project</span>
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/blueprint">
                        <Button variant={res.isTopRecommended ? "primary" : "outline"} size="sm" onClick={() => onSelectProject(res.candidate)} className="w-full text-xs gap-1">
                          <span>Select Candidate</span>
                        </Button>
                      </Link>
                    )}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
