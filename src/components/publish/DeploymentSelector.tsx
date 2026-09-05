"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Rocket, CheckCircle2, ShieldCheck, Terminal, ExternalLink, RefreshCw, AlertTriangle, Key, Layers, Globe, ShieldAlert, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DeploymentStatusResult } from "@/lib/integrations/deployment-provider";
import { diagnoseDeploymentFailure, DiagnosticDiagnosis } from "@/lib/integrations/deployment-retry";

interface DeploymentSelectorProps {
  repositoryName?: string;
  repositoryUrl?: string;
}

export function DeploymentSelector({
  repositoryName = "medforge-ai-diagnostic",
  repositoryUrl = "https://github.com/alex-chen-dev/medforge-ai-diagnostic",
}: DeploymentSelectorProps) {
  const [selectedProvider, setSelectedProvider] = useState<"vercel" | "render" | "netlify">("vercel");
  const [simulateFailure, setSimulateFailure] = useState(false);

  const [deploying, setDeploying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [deploymentResult, setDeploymentResult] = useState<DeploymentStatusResult | null>(null);
  const [failedDiagnosis, setFailedDiagnosis] = useState<DiagnosticDiagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const envVars = [
    { key: "NEXT_PUBLIC_APP_URL", value: "https://medforge-ai-diagnostic.vercel.app", isSecret: false, configured: true },
    { key: "NEXT_PUBLIC_SUPABASE_URL", value: "https://xyz.supabase.co", isSecret: false, configured: true },
    { key: "SUPABASE_SERVICE_ROLE_KEY", value: "••••••••••••••••", isSecret: true, configured: true },
  ];

  const steps = [
    "1. Provisioning Cloud Infrastructure",
    "2. Injecting Secure Env Variables",
    "3. Executing Framework Build",
    "4. Verifying Health Endpoint",
    "5. Live Deployment Online!",
  ];

  const handleDeploy = async () => {
    setError(null);
    setFailedDiagnosis(null);
    setDeploymentResult(null);
    setDeploying(true);
    setStepIndex(1);

    setTimeout(() => setStepIndex(2), 400);

    // If simulation toggle is active
    if (simulateFailure) {
      setTimeout(() => {
        setStepIndex(3);
        const diag = diagnoseDeploymentFailure("missing_env_var", ["Error: missing NEXT_PUBLIC_SUPABASE_URL"]);
        setFailedDiagnosis(diag);
        setError("Build Failed: Missing environment variable configuration.");
        setDeploying(false);
      }, 800);
      return;
    }

    try {
      setStepIndex(3);
      const res = await fetch("/api/projects/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedProvider,
          repositoryName,
          repositoryUrl,
        }),
      });

      const data = await res.json();
      setStepIndex(4);

      if (data.success && data.deploymentResult) {
        setTimeout(() => {
          setStepIndex(5);
          setDeploymentResult(data.deploymentResult);
          setDeploying(false);
        }, 500);
      } else {
        const diag = diagnoseDeploymentFailure(data.error || "Unknown deployment failure");
        setFailedDiagnosis(diag);
        setError(data.error || "Deployment failed.");
        setDeploying(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deployment error";
      const diag = diagnoseDeploymentFailure(msg);
      setFailedDiagnosis(diag);
      setError(msg);
      setDeploying(false);
    }
  };

  const handleRetry = () => {
    setSimulateFailure(false);
    handleDeploy();
  };

  return (
    <Card glow={deploymentResult ? "cyan" : failedDiagnosis ? "danger" : "none"} className="bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Rocket className="h-5 w-5 text-emerald-400" />
              <span>One-Click Cloud Deployment Selector</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Select deployment provider, review environment mapping, and trigger live hosting.
            </CardDescription>
          </div>

          {/* Hackathon Demo Failure Simulator Toggle */}
          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs shrink-0">
            <span className="text-[11px] text-slate-400 font-mono">Demo Mode: Test Error Diagnosis</span>
            <button
              type="button"
              onClick={() => setSimulateFailure(!simulateFailure)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                simulateFailure ? "bg-red-500/20 text-red-400 border border-red-500/40" : "bg-slate-800 text-slate-400"
              }`}
            >
              {simulateFailure ? "Simulate Error ON" : "Simulate Error OFF"}
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Provider Cards (Vercel, Render, Netlify) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Vercel Card */}
          <div
            onClick={() => setSelectedProvider("vercel")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedProvider === "vercel"
                ? "bg-slate-950 border-cyan-500/50 shadow-glow-cyan"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-sm">Vercel</span>
              <Badge variant="brand">Next.js Web</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Recommended for Next.js web applications with edge CDN & SSL.
            </p>
          </div>

          {/* Render Card */}
          <div
            onClick={() => setSelectedProvider("render")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedProvider === "render"
                ? "bg-slate-950 border-indigo-500/50 shadow-glow-indigo"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-sm">Render</span>
              <Badge variant="indigo">Full-stack / Service</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Recommended for Python FastAPI backends, Docker containers & web services.
            </p>
          </div>

          {/* Netlify Card */}
          <div
            onClick={() => setSelectedProvider("netlify")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedProvider === "netlify"
                ? "bg-slate-950 border-emerald-500/50 shadow-glow-cyan"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-sm">Netlify</span>
              <Badge variant="success">Static Frontend</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Recommended for static frontend builds & JAMstack sites.
            </p>
          </div>

        </div>

        {/* Environment Variables Mapping */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Key className="h-4 w-4 text-cyan-400" />
              <span>Provider Environment Variables Mapping</span>
            </span>
            <Badge variant="success" className="text-[10px]">Secrets Sanitized</Badge>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            {envVars.map((ev, i) => (
              <div key={i} className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200">{ev.key}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{ev.value}</span>
                  <Badge variant={ev.isSecret ? "indigo" : "slate"} className="py-0 text-[9px]">
                    {ev.isSecret ? "SECRET" : "PUBLIC"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Stepper Progress Bar */}
        {deploying && (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3 shadow-glow-cyan animate-pulse">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">{steps[stepIndex - 1] || "Deploying..."}</span>
              <span className="text-slate-400">Step {stepIndex} of 5</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(stepIndex / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Diagnostic Failure Recovery Card */}
        {failedDiagnosis && !deploying && (
          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/40 space-y-4 shadow-lg text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <span>BUILD FAILED — Diagnostic Recovery Engaged</span>
              </div>
              <Badge variant="danger">DIAGNOSIS ACTIVE</Badge>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <div className="text-red-400 font-bold">{failedDiagnosis.cause}</div>
              <div className="text-amber-300">{failedDiagnosis.recommendation}</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-slate-400 text-[11px] font-mono">{failedDiagnosis.actionableStep}</span>
              <Button
                variant="rescue"
                size="sm"
                onClick={handleRetry}
                className="w-full sm:w-auto gap-1.5 text-xs font-bold shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
                <span>⚡ Retry Deployment</span>
              </Button>
            </div>
          </div>
        )}

        {/* Live Deployment Success Banner & Action Buttons */}
        {deploymentResult && !deploying && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border border-emerald-500/40 space-y-4 shadow-glow-cyan">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <span className="font-bold text-white text-base">Application Deployed & Online!</span>
              </div>
              <Badge variant="success">LIVE URL VERIFIED</Badge>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="font-mono text-emerald-400 font-bold text-sm truncate">
                {deploymentResult.deploymentUrl}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/demo/live-app">
                  <Button variant="primary" size="sm" className="gap-1.5 text-xs shadow-glow-cyan">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Open Live Application Preview</span>
                  </Button>
                </Link>

                <a
                  href={deploymentResult.deploymentUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-1 text-xs text-slate-300" title="Open External Provider Host">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Build Logs Terminal Window */}
            <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-slate-900">
                <span className="flex items-center gap-1">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  Sanitized Build & Deployment Logs
                </span>
                <span>{selectedProvider.toUpperCase()} PROVIDER LOGS</span>
              </div>
              {deploymentResult.logs.map((log, i) => (
                <div key={i} className="text-emerald-400/90">{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* Trigger Button */}
        {!deploymentResult && !failedDiagnosis && (
          <Button
            type="button"
            variant="rescue"
            size="lg"
            disabled={deploying}
            onClick={handleDeploy}
            className="w-full gap-2 text-sm font-bold shadow-lg shadow-amber-500/10"
          >
            <Rocket className="h-4 w-4 fill-current" />
            <span>{deploying ? "Deploying Project Live..." : `Deploy to ${selectedProvider.toUpperCase()} & Launch Live URL`}</span>
          </Button>
        )}

      </CardContent>
    </Card>
  );
}
