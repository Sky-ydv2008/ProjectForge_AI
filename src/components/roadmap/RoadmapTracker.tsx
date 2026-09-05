"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, Clock, Calendar, AlertTriangle, Plus, ArrowRight, Rocket, Layers, Check, X, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectRoadmap, RoadmapTask } from "@/lib/validation/roadmap";

interface RoadmapTrackerProps {
  initialRoadmap: ProjectRoadmap;
}

export function RoadmapTracker({ initialRoadmap }: RoadmapTrackerProps) {
  const [roadmap, setRoadmap] = useState<ProjectRoadmap>(initialRoadmap);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPhase, setNewTaskPhase] = useState("Phase 1: Foundation & Project Setup (Week 1)");
  const [showAddForm, setShowAddForm] = useState(false);

  // Single-pass memoized metric computation
  const metrics = useMemo(() => {
    const tasks = roadmap.tasks;
    const total = tasks.length;
    let completed = 0;
    let blocked = 0;
    let inProgress = 0;
    let remainingDays = 0;

    const phaseSet = new Set<string>();

    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i];
      phaseSet.add(t.phase);

      if (t.status === "completed") {
        completed++;
      } else {
        remainingDays += t.estimated_days || 2;
        if (t.status === "blocked") blocked++;
        if (t.status === "in_progress") inProgress++;
      }
    }

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      totalTasks: total,
      completedTasks: completed,
      blockedTasks: blocked,
      inProgressTasks: inProgress,
      remainingDays,
      percentComplete: percent,
      phases: Array.from(phaseSet),
    };
  }, [roadmap.tasks]);

  const handleToggleStatus = (taskId: string) => {
    setRoadmap((prev) => {
      const updated = prev.tasks.map((t) => {
        if (t.id === taskId) {
          const nextStatus: RoadmapTask["status"] = 
            t.status === "pending" ? "in_progress" :
            t.status === "in_progress" ? "completed" :
            t.status === "completed" ? "blocked" : "pending";
          return { ...t, status: nextStatus };
        }
        return t;
      });
      return { ...prev, tasks: updated };
    });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: RoadmapTask = {
      id: `task-${Date.now()}`,
      phase: newTaskPhase,
      task: newTaskTitle.trim(),
      description: "Custom student build task",
      estimated_days: 2,
      status: "pending",
      order_index: roadmap.tasks.length + 1,
    };

    setRoadmap((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));

    setNewTaskTitle("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Progress Bar & Key Metrics */}
      <div className="p-6 rounded-2xl bg-[#0d111c] border border-slate-800 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">{roadmap.projectTitle}</h2>
              <Badge variant="indigo">M10 Roadmap & Progress</Badge>
            </div>
            <p className="text-xs text-slate-400">
              Phased build schedule derived directly from Technical Blueprint.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-1.5 text-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add Custom Task</span>
            </Button>

            <Link href="/publish">
              <Button variant="rescue" size="md" className="gap-2 text-xs font-bold shadow-sm">
                <Rocket className="h-4 w-4 fill-current" />
                <span>Publish to GitHub & Deploy →</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Overall Completion Progress Gauge Bar */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Build Progress: {metrics.completedTasks} / {metrics.totalTasks} Tasks Completed</span>
            </span>
            <span className="text-cyan-400 font-bold text-sm">{metrics.percentComplete}% Complete</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${metrics.percentComplete}%` }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Completed</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{metrics.completedTasks} Tasks</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">In Progress</div>
            <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">{metrics.inProgressTasks} Tasks</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Blocked / Delayed</div>
            <div className="text-lg font-bold text-red-400 font-mono mt-0.5">{metrics.blockedTasks} Tasks</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Remaining Work</div>
            <div className="text-lg font-bold text-indigo-400 font-mono mt-0.5">{metrics.remainingDays} Days</div>
          </div>
        </div>
      </div>

      {/* Emergency Scope Cut Warning Banner */}
      {metrics.blockedTasks > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold">Emergency Scope Cut Suggestion:</span> You have {metrics.blockedTasks} blocked task(s). Consider deferring optional features (e.g. Twilio SMS Alerts) to V2 to save 2 build days!
            </div>
          </div>
          <Link href="/rescue">
            <Button variant="rescue" size="sm" className="shrink-0 text-xs font-semibold">
              Review Scope Rescue →
            </Button>
          </Link>
        </div>
      )}

      {/* Add Custom Task Form */}
      {showAddForm && (
        <Card className="bg-[#0d111c] border-slate-800">
          <CardContent className="p-4">
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Add Docker containerization setup"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
              <select
                value={newTaskPhase}
                onChange={(e) => setNewTaskPhase(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
              >
                {metrics.phases.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <Button type="submit" variant="primary" size="sm" className="text-xs font-bold">Add Task</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Phased Roadmap Kanban / Task Lists */}
      <div className="space-y-6">
        {metrics.phases.map((phaseName) => {
          const phaseTasks = roadmap.tasks.filter((t) => t.phase === phaseName);
          const phaseCompleted = phaseTasks.filter((t) => t.status === "completed").length;
          const isPhaseDone = phaseCompleted === phaseTasks.length;

          return (
            <Card key={phaseName} glow={isPhaseDone ? "cyan" : "none"} className="bg-[#0d111c] border-slate-800">
              <CardHeader className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="h-4 w-4 text-cyan-400" />
                    <span>{phaseName}</span>
                  </CardTitle>
                  <Badge variant={isPhaseDone ? "success" : "indigo"}>
                    {phaseCompleted}/{phaseTasks.length} Completed
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-2">
                {phaseTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleToggleStatus(t.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                      t.status === "completed"
                        ? "bg-slate-950/60 border-emerald-500/30 text-slate-400 line-through"
                        : t.status === "in_progress"
                          ? "bg-slate-950 border-cyan-500/40 text-slate-100 shadow-sm"
                          : t.status === "blocked"
                            ? "bg-red-500/10 border-red-500/40 text-red-300"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${
                        t.status === "completed"
                          ? "bg-emerald-500 text-slate-950 border-emerald-400"
                          : t.status === "in_progress"
                            ? "bg-cyan-500/20 text-cyan-400 border-cyan-400 animate-pulse"
                            : t.status === "blocked"
                              ? "bg-red-500/20 text-red-400 border-red-400"
                              : "border-slate-700 text-slate-500"
                      }`}>
                        {t.status === "completed" ? <Check className="h-3 w-3 stroke-[3]" /> : t.status === "blocked" ? "!" : ""}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white">{t.task}</div>
                        {t.description && <div className="text-[11px] text-slate-400 mt-0.5">{t.description}</div>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                      <span className="text-slate-500">{t.estimated_days}d</span>
                      <Badge variant={
                        t.status === "completed" ? "success" : t.status === "in_progress" ? "brand" : t.status === "blocked" ? "danger" : "slate"
                      } className="uppercase text-[9px] py-0">
                        {t.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
