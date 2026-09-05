"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Layers, Code2, Server, Database, Lock, Rocket, Sparkles, CheckCircle2, Copy, Check, ArrowRight, ShieldCheck, Plus, MessageSquareText, X, Terminal, Activity, Key } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectBlueprint } from "@/lib/validation/blueprint";

interface BlueprintViewerProps {
  blueprint: ProjectBlueprint;
  onGenerateCustomProblem?: (problemStatement: string) => void;
  onGenerateRoadmap?: () => void;
}

export function BlueprintViewer({ blueprint, onGenerateCustomProblem, onGenerateRoadmap }: BlueprintViewerProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [copied, setCopied] = useState(false);
  
  // Custom Problem Statement Form State
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [customProblem, setCustomProblem] = useState("");
  const [submittingProblem, setSubmittingProblem] = useState(false);

  const samplePresets = [
    "AWS CloudWatch Real-time Security Log Analyzer to Detect Brute-force Intrusion Attacks",
    "FinTech Micro-Payment Fraud Detection Gateway with Isolation Forest Anomaly Scoring",
    "Smart ICU Patient Vitals Deterioration Prediction & Real-time Triage Dashboard",
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "architecture", label: "Architecture Topology", icon: Cpu },
    { id: "features", label: "Features & Priority", icon: Code2 },
    { id: "techstack", label: "Tech Stack Rationale", icon: Server },
    { id: "database", label: "Database Schema", icon: Database },
    { id: "apis", label: "REST API Spec", icon: Lock },
    { id: "security", label: "Security & RLS", icon: ShieldCheck },
    { id: "deployment", label: "Deployment & Demo", icon: Rocket },
  ];

  const handleCopySpec = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomProblemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customProblem.trim()) return;

    setSubmittingProblem(true);
    if (onGenerateCustomProblem) {
      await onGenerateCustomProblem(customProblem.trim());
    }
    setSubmittingProblem(false);
    setShowProblemModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">{blueprint.projectTitle}</h2>
            <Badge variant="brand">Full Architecture Plan</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Comprehensive system architecture specification ready for implementation, GitHub auto-publishing, and deployment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Problem Statement Trigger Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowProblemModal(true)}
            className="gap-1.5 text-xs text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/10"
          >
            <MessageSquareText className="h-4 w-4" />
            <span>Input Custom Problem Statement</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleCopySpec} className="gap-1.5 text-xs">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Spec JSON Copied!" : "Export Spec JSON"}</span>
          </Button>

          <Link href="/roadmap">
            <Button variant="rescue" size="md" onClick={onGenerateRoadmap} className="gap-2 text-xs font-bold shadow-lg shadow-amber-500/10">
              <Sparkles className="h-4 w-4 fill-current" />
              <span>Generate Roadmap →</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Custom Problem Input Modal */}
      {showProblemModal && (
        <Card className="bg-slate-900 border-cyan-500/40 shadow-glow-cyan">
          <CardHeader className="pb-3 border-b border-slate-800 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-cyan-400" />
                <span>Input Custom Problem Statement</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Provide your custom project idea or problem statement to generate a tailored 8-tab technical blueprint.
              </CardDescription>
            </div>
            <button
              onClick={() => setShowProblemModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Or Choose Quick Sample Problem Preset</span>
              <div className="flex flex-col gap-2">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomProblem(preset)}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-left text-xs text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all flex items-center justify-between"
                  >
                    <span>“{preset}”</span>
                    <Plus className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCustomProblemSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Problem Statement / Project Goal</label>
                <textarea
                  rows={3}
                  required
                  value={customProblem}
                  onChange={(e) => setCustomProblem(e.target.value)}
                  placeholder="Describe your custom project problem statement here (e.g. Build an AI-driven automated code security scanner that parses GitHub repos for hardcoded secrets...)"
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowProblemModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={submittingProblem || !customProblem.trim()} className="gap-2 text-xs font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>{submittingProblem ? "Generating Architecture..." : "Generate Full Architecture Plan"}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* 8-Tab Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENTS */}
      <Card glow="cyan" className="bg-slate-900 border-slate-800 min-h-[400px]">
        <CardContent className="p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Architectural Problem & Value Rationale</h3>
                <p className="text-xs text-slate-400">High-level problem breakdown, solution architecture, and academic value thesis.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-red-400 font-bold uppercase tracking-wider text-[10px]">Problem Statement</span>
                  <p className="text-slate-300 leading-relaxed">{blueprint.overview.problemStatement}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Solution Summary</span>
                  <p className="text-slate-300 leading-relaxed">{blueprint.overview.solutionSummary}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Target User Personas</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {blueprint.overview.targetUsers.map((u, i) => (
                      <Badge key={i} variant="brand">{u}</Badge>
                    ))}
                  </div>
                  <p className="text-slate-300 pt-2 border-t border-slate-900 leading-relaxed">{blueprint.overview.valueProposition}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Academic & Engineering Value Rationale</span>
                  <p className="text-slate-300 leading-relaxed">
                    {blueprint.overview.academicValue || "Demonstrates practical full-stack software engineering, REST microservices, zero-trust security isolation, and production deployment."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === "architecture" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">System Topology & Inter-Service Data Flow</h3>
                <p className="text-slate-400">Complete 3-tier component topology diagram and non-functional performance metrics.</p>
              </div>

              {/* Topology Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">System Topology Architecture</span>
                <p className="text-slate-200 font-mono mt-1 text-sm">{blueprint.architecture.topology}</p>
              </div>

              {/* Architecture Diagram Layout */}
              <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-2">
                <div className="text-slate-500 text-[10px] pb-1 border-b border-slate-900">SYSTEM ARCHITECTURE DIAGRAM SPECIFICATION</div>
                <pre className="overflow-x-auto text-emerald-400 leading-tight py-2">
{blueprint.architecture.architectureDiagramSpec || `[ Client Browser / User UI ] ---> [ Next.js 14 App Router (Vercel Edge) ]
                                | (Zod Schema Validation)
                                v
                   [ FastAPI ML Microservice (Render) ]
                                |
                                +---> [ XGBoost Model Inference Engine ]
                                |
                                v
                   [ Supabase PostgreSQL + RLS ] <---> [ Redis Cache Tier ]`}
                </pre>
              </div>

              {/* Component Layers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">1. Presentation Layer</span>
                  <p className="text-slate-200 font-mono">{blueprint.architecture.frontendComponent}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">2. Inference Backend</span>
                  <p className="text-slate-200 font-mono">{blueprint.architecture.backendComponent}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">3. Database & Cache</span>
                  <p className="text-slate-200 font-mono">{blueprint.architecture.databaseComponent}</p>
                </div>
              </div>

              {/* Non-Functional Metrics */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Non-Functional Performance Targets</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  {(blueprint.architecture.nonFunctionalMetrics || [
                    "Inference Latency: < 50ms",
                    "Throughput: 500 req/sec",
                    "UI Render: < 100ms",
                    "Availability: 99.9% Uptime"
                  ]).map((m, i) => (
                    <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">• {m}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Data Flow Description</span>
                <p className="text-slate-300 font-mono leading-relaxed">{blueprint.architecture.dataFlowDescription}</p>
              </div>
            </div>
          )}

          {/* TAB 3: FEATURES */}
          {activeTab === "features" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Functional Requirements & Feature Priority Model</h3>
                <p className="text-slate-400">Classified using MUST HAVE / SHOULD HAVE / COULD HAVE / REMOVE model with build duration estimates.</p>
              </div>

              <div className="space-y-2">
                {blueprint.features.map((f, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{f.name}</span>
                        <Badge variant={f.priority === "MUST HAVE" ? "success" : f.priority === "REMOVE" ? "danger" : "brand"} className="text-[9px]">
                          {f.priority}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">{f.description}</p>
                    </div>
                    <span className="font-mono text-cyan-400 shrink-0 font-bold">{f.estimatedDays} Estimated Days</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TECH STACK */}
          {activeTab === "techstack" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Recommended Technology Stack & Rationale</h3>
                <p className="text-slate-400">In-depth architectural justification for frontend, backend, database, and cloud choice.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Frontend Tier</span>
                  <p className="text-cyan-300 font-mono font-bold text-sm">{blueprint.techStack.frontend}</p>
                  <p className="text-slate-400 text-[11px]">{blueprint.techStack.frontendRationale || "Next.js App Router provides instant edge rendering and seamless Vercel integration."}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Backend Inference Tier</span>
                  <p className="text-indigo-300 font-mono font-bold text-sm">{blueprint.techStack.backend}</p>
                  <p className="text-slate-400 text-[11px]">{blueprint.techStack.backendRationale || "FastAPI offers highest async performance for Python ML inference microservices."}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Database Tier</span>
                  <p className="text-emerald-300 font-mono font-bold text-sm">{blueprint.techStack.database}</p>
                  <p className="text-slate-400 text-[11px]">{blueprint.techStack.databaseRationale || "Supabase PostgreSQL supplies relational storage with built-in RLS policies for strict user isolation."}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Cloud Hosting</span>
                  <p className="text-amber-300 font-mono font-bold text-sm">{blueprint.techStack.hosting}</p>
                  <p className="text-slate-400 text-[11px]">Vercel for frontend + Render for backend services.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Overall Architectural Rationale</span>
                <p className="text-slate-300 leading-relaxed">{blueprint.techStack.rationale}</p>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE DESIGN */}
          {activeTab === "database" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Database Schema & Relational Tables</h3>
                <p className="text-slate-400">PostgreSQL relational table specifications and RLS enforcement policies.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprint.databaseDesign.map((tbl, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-cyan-400 text-sm">{tbl.tableName}</span>
                      <Badge variant="slate">PK: {tbl.primaryKey}</Badge>
                    </div>
                    <p className="text-slate-400 text-[11px]">{tbl.description}</p>
                    <div className="pt-2 border-t border-slate-900 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Columns:</span>
                      {tbl.columns.map((col, idx) => (
                        <div key={idx} className="font-mono text-slate-300 text-[11px] truncate">• {col}</div>
                      ))}
                    </div>
                    {tbl.rlsPolicy && (
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-emerald-400">
                        {tbl.rlsPolicy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: APIS */}
          {activeTab === "apis" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">RESTful API Endpoints Specification Reference</h3>
                <p className="text-slate-400">Endpoint routes, HTTP methods, payloads, response status, and access controls.</p>
              </div>

              <div className="space-y-3">
                {blueprint.apiEndpoints.map((api, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                          api.method === "POST" ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-500/20 text-cyan-400"
                        }`}>
                          {api.method}
                        </span>
                        <span className="font-mono font-bold text-white text-sm">{api.route}</span>
                      </div>
                      <Badge variant="indigo" className="shrink-0">{api.accessLevel}</Badge>
                    </div>
                    <p className="text-slate-400 text-[11px]">{api.description}</p>

                    {api.requestPayload && (
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
                        <span className="text-slate-500 block text-[10px]">Payload / Response:</span>
                        {api.requestPayload} {api.responseStatus ? `→ ${api.responseStatus}` : ""}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Security & Row Level Security (RLS) Model</h3>
                <p className="text-slate-400">Authentication, RLS policies, input validation, secret management, and rate limiting.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Authentication</span>
                  <p className="text-slate-300">{blueprint.securityModel.authentication}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Row Level Security (RLS)</span>
                  <p className="text-slate-300">{blueprint.securityModel.authorizationRls}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Input Validation</span>
                  <p className="text-slate-300">{blueprint.securityModel.inputValidation}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Secret Management</span>
                  <p className="text-slate-300">{blueprint.securityModel.secretManagement}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DEPLOYMENT */}
          {activeTab === "deployment" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Deployment Topology & Hackathon Presentation Script</h3>
                <p className="text-slate-400">Hosting targets, required env vars, CI/CD setup, and presentation flow.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Hosting Target & Build Command</span>
                  <div className="font-mono text-slate-200">{blueprint.deploymentPlan.provider}</div>
                  <div className="font-mono text-cyan-400 bg-slate-900 p-2 rounded border border-slate-800">{blueprint.deploymentPlan.buildCommand}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Required Environment Variables</span>
                  <div className="space-y-1">
                    {blueprint.deploymentPlan.envVarsRequired.map((ev, i) => (
                      <div key={i} className="font-mono text-slate-300 text-[11px]">• {ev}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">2-Minute Hackathon Presentation Script Flow</span>
                <div className="space-y-2">
                  {blueprint.deploymentPlan.demoFlowSteps.map((step, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2">
                      <span className="font-mono text-cyan-400 font-bold">{i + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
