"use client";

import React from "react";
import { Github, CheckCircle2, ShieldAlert, Sparkles, ExternalLink, Unlink, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useGitHub } from "@/context/GitHubContext";

export function GitHubConnectCard() {
  const { githubState, connectGithub, connectDemoGithub, disconnectGithub } = useGitHub();

  return (
    <Card glow={githubState.isConnected ? "cyan" : "none"} className="bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Github className="h-5 w-5 text-white" />
            <span>GitHub OAuth Authorization</span>
          </CardTitle>
          <Badge variant={githubState.isConnected ? "success" : "slate"}>
            {githubState.isConnected ? "Connected" : "Not Authorized"}
          </Badge>
        </div>
        <CardDescription className="text-xs text-slate-400">
          Required to programmatically create repositories and push generated project commits.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {githubState.isConnected ? (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={githubState.avatarUrl || "https://avatars.githubusercontent.com/u/583231?v=4"}
                alt="GitHub Avatar"
                className="h-10 w-10 rounded-full border border-cyan-500/40 shrink-0"
              />
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>@{githubState.username || "alex-chen-dev"}</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                  <span>Granted Scopes: {githubState.scopes.join(", ")}</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => disconnectGithub()}
              className="gap-1.5 text-xs text-slate-400 hover:text-red-400 hover:border-red-500/30"
            >
              <Unlink className="h-3.5 w-3.5" />
              <span>Disconnect</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              ProjectForge AI uses least-privilege OAuth scope (<code className="text-cyan-400 font-mono">repo, user</code>) to create repositories in your account. We never store raw secrets.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => connectGithub()}
                className="flex-1 gap-2 text-xs font-semibold"
              >
                <Github className="h-4 w-4" />
                <span>Connect GitHub Account</span>
              </Button>

              <Button
                variant="rescue"
                size="md"
                onClick={connectDemoGithub}
                className="gap-1.5 text-xs shrink-0"
              >
                <Sparkles className="h-4 w-4 fill-current" />
                <span>⚡ Connect Demo Account (@alex-chen-dev)</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
