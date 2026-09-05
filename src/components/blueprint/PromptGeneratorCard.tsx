"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, Terminal, ExternalLink, Code2, Server, Database, Layers, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generateAICodingPrompts, AICodingPromptSuite } from "@/lib/ai/prompt-generator";
import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { ProjectBlueprint } from "@/lib/validation/blueprint";

interface PromptGeneratorCardProps {
  profile: StudentProfileInput;
  candidate?: AIProjectCandidate;
  blueprint?: ProjectBlueprint;
}

export function PromptGeneratorCard({ profile, candidate, blueprint }: PromptGeneratorCardProps) {
  const [activeTab, setActiveTab] = useState<keyof AICodingPromptSuite>("masterPrompt");
  const [targetTool, setTargetTool] = useState<string>("ChatGPT / Claude");
  const [copied, setCopied] = useState(false);

  const promptSuite: AICodingPromptSuite = generateAICodingPrompts(profile, candidate, blueprint);

  const promptTabs = [
    { id: "masterPrompt" as const, label: "Master System Prompt", icon: Layers, desc: "Full-stack system architecture prompt" },
    { id: "frontendPrompt" as const, label: "Frontend UI Component", icon: Code2, desc: "v0 / Cursor UI prompt for React & Tailwind" },
    { id: "backendPrompt" as const, label: "Backend API & Logic", icon: Server, desc: "FastAPI / Node REST endpoint prompt" },
    { id: "databasePrompt" as const, label: "Database SQL & RLS", icon: Database, desc: "PostgreSQL DDL & RLS security policies" },
    { id: "unitTestPrompt" as const, label: "Unit & Integration Tests", icon: CheckCircle2, desc: "Automated test suite prompt" },
  ];

  const aiTools = [
    { name: "ChatGPT / Claude", url: "https://chatgpt.com" },
    { name: "v0.dev", url: "https://v0.dev" },
    { name: "Cursor IDE", url: "https://cursor.com" },
    { name: "Bolt.new", url: "https://bolt.new" },
  ];

  const currentPromptText = promptSuite[activeTab];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card glow="cyan" className="bg-[#0d111c] border-cyan-500/30 shadow-glow-cyan" role="region" aria-label="AI Coding Prompts Generator">
      <CardHeader className="pb-4 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg font-bold text-white">AI Coding Prompts Generator</CardTitle>
              <Badge variant="brand">Copy & Build</Badge>
            </div>
            <CardDescription className="text-xs text-slate-400">
              Generate optimized, copyable prompts tailored to your project blueprint to feed into ChatGPT, Cursor, v0, or Claude.
            </CardDescription>
          </div>

          <Button
            variant="rescue"
            size="sm"
            onClick={handleCopyPrompt}
            aria-label="Copy AI Prompt to Clipboard"
            className="shrink-0 gap-1.5 text-xs font-bold shadow-sm"
          >
            {copied ? <Check className="h-4 w-4 text-slate-950" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied Prompt to Clipboard!" : "Copy Active AI Prompt 📋"}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        
        {/* Target AI Tool Selector */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="font-semibold text-slate-400">Target AI Tool:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {aiTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                  targetTool === tool.name
                    ? "bg-slate-800 text-cyan-300 border-cyan-500/40 font-bold"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
                onClick={() => setTargetTool(tool.name)}
              >
                <span>{tool.name}</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Prompt Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
          {promptTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-label={`Select ${tab.label}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Formatted Code & Prompt Window */}
        <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-2 font-mono text-xs text-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[10px] pb-2 border-b border-slate-900">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="h-3.5 w-3.5" />
              {promptTabs.find((t) => t.id === activeTab)?.label} — Ready for {targetTool}
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
            >
              {copied ? "COPIED!" : "COPY PROMPT 📋"}
            </button>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed py-2 text-slate-300">
            {currentPromptText}
          </pre>
        </div>

      </CardContent>
    </Card>
  );
}
