"use client";

import React, { useState } from "react";
import { MessageSquare, Sparkles, Send, Bot, User, ShieldCheck, Cpu, ArrowRight, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useProfile } from "@/context/ProfileContext";
import { MentorMessage } from "@/lib/validation/mentor";
import { QUICK_ACTION_PROMPTS, DEMO_MENTOR_RESPONSES } from "@/lib/ai/fixtures/mentor-fixtures";

export function MentorChat() {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: "Hello! I am your Project-Aware AI Mentor. I am synced with your profile, blueprint, risks, and roadmap progress.",
      recommendation: "Select any Quick Action Prompt below or ask me high-stakes engineering questions about your project.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: MentorMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/projects/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend.trim(),
          profile,
          projectTitle: "MedForge AI — Clinical Risk Prediction Platform",
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (err) {
      console.error("Mentor chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner: Context Synchronizer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Project-Aware AI Mentor</h2>
            <Badge variant="brand">M11 Context Synced</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Synced with <span className="text-cyan-300 font-semibold">{profile?.field || "Computer Science"}</span> profile, active technical blueprint, and roadmap tasks.
          </p>
        </div>

        {/* Synced Context Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="success" className="gap-1">
            <User className="h-3 w-3" />
            Profile Synced
          </Badge>
          <Badge variant="brand" className="gap-1">
            <Cpu className="h-3 w-3" />
            Blueprint Synced
          </Badge>
          <Badge variant="indigo" className="gap-1">
            <Clock className="h-3 w-3" />
            Roadmap Synced
          </Badge>
        </div>
      </div>

      {/* Quick Action Prompts Bar */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-4">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>High-Stakes Quick Action Prompts</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {QUICK_ACTION_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPromptClick(prompt)}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all flex items-center justify-between gap-2 group"
              >
                <span className="font-medium text-[11px]">“{prompt}”</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Thread Window */}
      <Card glow="cyan" className="bg-slate-900 border-slate-800 shadow-2xl min-h-[450px] flex flex-col justify-between">
        <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[600px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-glow-cyan text-slate-950 font-bold shrink-0 mt-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`max-w-2xl rounded-2xl p-4 space-y-3 ${
                msg.role === "user" 
                  ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-medium" 
                  : "bg-slate-950 border border-slate-800 text-slate-200"
              }`}>
                <p className="leading-relaxed">{msg.content}</p>

                {/* Structured Assistant Response Breakdown */}
                {msg.role === "assistant" && (msg.recommendation || msg.why || msg.implementationSteps) && (
                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                    
                    {/* Recommendation */}
                    {msg.recommendation && (
                      <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        <span className="font-bold uppercase text-[10px] text-cyan-400 block mb-0.5">Recommendation</span>
                        <span>{msg.recommendation}</span>
                      </div>
                    )}

                    {/* Why Rationale */}
                    {msg.why && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                        <span className="font-bold uppercase text-[10px] text-indigo-400 block mb-0.5">Why (Rationale)</span>
                        <span>{msg.why}</span>
                      </div>
                    )}

                    {/* Implementation Steps */}
                    {msg.implementationSteps && msg.implementationSteps.length > 0 && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="font-bold uppercase text-[10px] text-emerald-400 block mb-1">Concrete Implementation Steps</span>
                        {msg.implementationSteps.map((step, idx) => (
                          <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Risks & Mitigations */}
                    {msg.risks && msg.risks.length > 0 && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        <span className="font-bold uppercase text-[10px] text-amber-400 block mb-1">Key Risks & Mitigations</span>
                        {msg.risks.map((r, idx) => (
                          <div key={idx} className="text-[11px] flex items-start gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Time-Limited Alternative */}
                    {msg.timeLimitedAlternative && (
                      <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                        <span className="font-bold uppercase text-[10px] text-indigo-400 block mb-0.5">Alternative If Time-Limited</span>
                        <span>{msg.timeLimitedAlternative}</span>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-cyan-500/30 text-cyan-400 font-bold text-xs shrink-0 mt-1">
                  U
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-slate-400 animate-pulse">
              <Bot className="h-5 w-5 text-cyan-400" />
              <span>Project-Aware Mentor formulating structured response...</span>
            </div>
          )}
        </CardContent>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 rounded-b-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI Mentor a project engineering question..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <Button type="submit" variant="primary" size="md" disabled={loading || !input.trim()} className="gap-1.5 shrink-0">
              <Send className="h-4 w-4" />
              <span>Ask Mentor</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
