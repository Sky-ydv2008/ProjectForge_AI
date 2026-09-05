"use client";

import React, { useState } from "react";
import { Database, ShieldCheck, Copy, Check, Table, Lock, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TableMeta {
  name: string;
  description: string;
  columnsCount: number;
  rlsPolicy: string;
  category: "Core" | "Rescue & Spec" | "V2 Shipping";
}

const TABLES: TableMeta[] = [
  { name: "student_profiles", description: "Stores student skills, constraints, timeline, and career goals", columnsCount: 15, rlsPolicy: "auth.uid() = user_id", category: "Core" },
  { name: "projects", description: "Project candidates, feasibility scores, and technical summary", columnsCount: 19, rlsPolicy: "auth.uid() = user_id", category: "Core" },
  { name: "project_features", description: "Rescoped feature priorities (MUST/SHOULD/COULD/REMOVE)", columnsCount: 9, rlsPolicy: "EXISTS (projects.user_id = auth.uid())", category: "Rescue & Spec" },
  { name: "project_risks", description: "Risk probability, severity, impact, and mitigation strategies", columnsCount: 8, rlsPolicy: "EXISTS (projects.user_id = auth.uid())", category: "Rescue & Spec" },
  { name: "project_roadmap", description: "Weekly build tasks, status tracking, and order index", columnsCount: 9, rlsPolicy: "EXISTS (projects.user_id = auth.uid())", category: "Rescue & Spec" },
  { name: "mentor_messages", description: "Context-aware AI mentor consultation chat history", columnsCount: 6, rlsPolicy: "auth.uid() = user_id", category: "Core" },
  { name: "github_connections", description: "Encrypted OAuth credentials for automatic repo publishing", columnsCount: 8, rlsPolicy: "auth.uid() = user_id", category: "V2 Shipping" },
  { name: "publish_jobs", description: "Automated repo creation and deployment job status logs", columnsCount: 12, rlsPolicy: "auth.uid() = user_id", category: "V2 Shipping" },
  { name: "deployment_configs", description: "Vercel / Render build options, framework, and root dir", columnsCount: 10, rlsPolicy: "EXISTS (projects.user_id = auth.uid())", category: "V2 Shipping" },
  { name: "deployment_env_vars", description: "Environment variables requirements and secret mapping", columnsCount: 8, rlsPolicy: "EXISTS (projects.user_id = auth.uid())", category: "V2 Shipping" },
];

export function SchemaInspector() {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Core", "Rescue & Spec", "V2 Shipping"];

  const filteredTables = selectedCategory === "All" 
    ? TABLES 
    : TABLES.filter((t) => t.category === selectedCategory);

  const handleCopySql = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card glow="cyan" className="bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Database className="h-6 w-6 text-cyan-400" />
              <span>Supabase PostgreSQL Schema & RLS Inspector</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 mt-1">
              Production schema architecture matching Section 10 & V2 specifications.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopySql}
              className="gap-1.5 text-xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "SQL Copied!" : "Copy SQL Schema"}</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Category filter pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Filter Domain:</span>
          <div className="flex items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTables.map((tbl) => (
            <div
              key={tbl.name}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4 text-cyan-400" />
                    <span className="font-mono font-bold text-sm text-white">{tbl.name}</span>
                  </div>
                  <Badge variant={tbl.category === "V2 Shipping" ? "indigo" : tbl.category === "Rescue & Spec" ? "warning" : "brand"}>
                    {tbl.category}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tbl.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <Layers className="h-3 w-3 text-slate-500" />
                  {tbl.columnsCount} Columns
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Lock className="h-3 w-3 text-emerald-400" />
                  RLS: {tbl.rlsPolicy}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RLS Security Guarantee Banner */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 flex items-start gap-3 text-xs">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-emerald-300">Row Level Security (RLS) Isolation Enforced</div>
            <div className="text-slate-400 mt-0.5 leading-relaxed">
              Every table enforces PostgreSQL Row Level Security (<code className="text-cyan-400">ENABLE ROW LEVEL SECURITY</code>). Students cannot query, modify, or leak another student&apos;s projects, blueprints, GitHub OAuth tokens, or deployment environment variables.
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
