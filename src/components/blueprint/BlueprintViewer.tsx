"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Layers, Code2, Server, Database, Lock, Rocket, Sparkles, CheckCircle2, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectBlueprint } from "@/lib/validation/blueprint";

interface BlueprintViewerProps {
  blueprint: ProjectBlueprint;
  onGenerateRoadmap?: () => void;
}

export function BlueprintViewer({ blueprint, onGenerateRoadmap }: BlueprintViewerProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "architecture", label: "Architecture", icon: Cpu },
    { id: "features", label: "Features", icon: Code2 },
    { id: "techstack", label: "Tech Stack", icon: Server },
    { id: "database", label: "Database", icon: Database },
    { id: "apis", label: "APIs & Spec", icon: Lock },
    { id: "security", label: "Security & RLS", icon: ShieldCheck },
    { id: "deployment", label: "Deployment & Demo", icon: Rocket },
  ];

  const handleCopySpec = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">{blueprint.projectTitle}</h2>
            <Badge variant="brand">M8 Technical Blueprint</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Generated technical specification ready for execution, GitHub auto-publishing, and deployment.
          </p>
        </div>

        <div className="flex items-center gap-3">
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

      {/* 8-Tab Horizontal Navigation Bar */}
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
                <h3 className="text-lg font-bold text-white mb-1">Project Problem & Value Proposition</h3>
                <p className="text-xs text-slate-400">High-level summary of problem statement and core MVP solution.</p>
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

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Target Users & Core Value Proposition</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {blueprint.overview.targetUsers.map((u, i) => (
                    <Badge key={i} variant="brand">{u}</Badge>
                  ))}
                </div>
                <p className="text-slate-300 pt-2 border-t border-slate-900 leading-relaxed">{blueprint.overview.valueProposition}</p>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === "architecture" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">System Topology & Data Flow</h3>
                <p className="text-slate-400">Component separation and inter-service request routing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">System Topology</span>
                <p className="text-slate-200 font-mono mt-1 text-sm">{blueprint.architecture.topology}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Frontend Layer</span>
                  <p className="text-slate-200 font-mono">{blueprint.architecture.frontendComponent}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Backend Inference</span>
                  <p className="text-slate-200 font-mono">{blueprint.architecture.backendComponent}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Database Layer</span>
                  <p className="text-slate-200 font-mono">{blueprint.architecture.databaseComponent}</p>
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
                <h3 className="text-lg font-bold text-white mb-1">Functional Requirements & Priority Model</h3>
                <p className="text-slate-400">Classified using MUST HAVE / SHOULD HAVE / COULD HAVE / REMOVE model.</p>
              </div>

              <div className="space-y-2">
                {blueprint.features.map((f, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{f.name}</span>
                        <Badge variant={f.priority === "MUST HAVE" ? "success" : f.priority === "REMOVE" ? "danger" : "brand"} className="text-[9px]">
                          {f.priority}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{f.description}</p>
                    </div>
                    <span className="font-mono text-slate-400 shrink-0">{f.estimatedDays} Days</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TECH STACK */}
          {activeTab === "techstack" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Recommended Technology Stack</h3>
                <p className="text-slate-400">Selected based on student skill match and timeline constraints.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Frontend Framework</span>
                  <p className="text-cyan-300 font-mono font-semibold">{blueprint.techStack.frontend}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Backend Framework</span>
                  <p className="text-indigo-300 font-mono font-semibold">{blueprint.techStack.backend}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Database System</span>
                  <p className="text-emerald-300 font-mono font-semibold">{blueprint.techStack.database}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Cloud Hosting</span>
                  <p className="text-amber-300 font-mono font-semibold">{blueprint.techStack.hosting}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Architect Rationale</span>
                <p className="text-slate-300 leading-relaxed">{blueprint.techStack.rationale}</p>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE DESIGN */}
          {activeTab === "database" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Database Schema Tables</h3>
                <p className="text-slate-400">PostgreSQL relational table specifications.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: APIS */}
          {activeTab === "apis" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">RESTful API Endpoints Specification</h3>
                <p className="text-slate-400">Endpoint routes, HTTP methods, and role access controls.</p>
              </div>

              <div className="space-y-3">
                {blueprint.apiEndpoints.map((api, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                        api.method === "POST" ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-500/20 text-cyan-400"
                      }`}>
                        {api.method}
                      </span>
                      <div>
                        <div className="font-mono font-bold text-white">{api.route}</div>
                        <div className="text-slate-400 text-[11px]">{api.description}</div>
                      </div>
                    </div>
                    <Badge variant="indigo" className="shrink-0">{api.accessLevel}</Badge>
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
                <p className="text-slate-400">Authentication, RLS policies, input validation, and secret handling.</p>
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
                <h3 className="text-lg font-bold text-white mb-1">Deployment Plan & 2-Minute Demo Flow</h3>
                <p className="text-slate-400">Hosting targets, required env vars, and hackathon presentation script.</p>
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
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">2-Minute Hackathon Demo Script Flow</span>
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
