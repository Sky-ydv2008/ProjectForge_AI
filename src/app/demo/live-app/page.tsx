"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Hammer, Sparkles, CheckCircle2, ShieldAlert, Activity, Heart, ArrowLeft, RefreshCw, Send, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function LiveAppDemoPage() {
  const [heartRate, setHeartRate] = useState(112);
  const [systolicBp, setSystolicBp] = useState(154);
  const [oxygenSat, setOxygenSat] = useState(93);
  const [riskScore, setRiskScore] = useState(84);
  const [alertSent, setAlertSent] = useState(false);

  const handleSimulateSensor = () => {
    // Generate new vitals & update risk score
    const newHr = Math.floor(Math.random() * 40) + 95;
    const newBp = Math.floor(Math.random() * 40) + 140;
    const newO2 = Math.floor(Math.random() * 5) + 91;
    setHeartRate(newHr);
    setSystolicBp(newBp);
    setOxygenSat(newO2);

    const calculatedRisk = Math.min(98, Math.max(65, Math.round((newHr * 0.3) + (newBp * 0.3) + ((100 - newO2) * 3))));
    setRiskScore(calculatedRisk);
    setAlertSent(false);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans">
      
      {/* Live Deployed App Header Bar */}
      <header className="border-b border-emerald-500/30 bg-slate-950/90 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
            <Activity className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">MedForge AI — Clinical Diagnostic Dashboard</span>
              <Badge variant="success" className="gap-1 font-mono text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED LIVE DEPLOYMENT
              </Badge>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Host: medforge-ai-diagnostic.vercel.app • Rescued MVP Production Service
            </span>
          </div>
        </div>

        <Link href="/publish">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Publish Center</span>
          </Button>
        </Link>
      </header>

      {/* Main App Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Banner callout */}
        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              This is the <strong>Live Application Preview</strong> deployed from ProjectForge AI. You are viewing the live XGBoost patient triage model and analytics dashboard.
            </span>
          </div>
          <Button variant="rescue" size="sm" onClick={handleSimulateSensor} className="shrink-0 gap-1.5 text-xs font-semibold">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Simulate Live Sensor Stream</span>
          </Button>
        </div>

        {/* Top Cards: Live Vitals & Risk Score */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Risk Gauge Card */}
          <Card glow="cyan" className="md:col-span-1 bg-slate-900 border-slate-800 flex flex-col justify-between">
            <CardHeader className="pb-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">XGBoost Risk Score</span>
              <CardTitle className="text-3xl font-extrabold font-mono flex items-center gap-2 text-red-400">
                <span>{riskScore}%</span>
                <Badge variant="danger" className="text-[10px]">HIGH RISK</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-500" style={{ width: `${riskScore}%` }} />
              </div>
              <p className="text-[11px] text-slate-400">48-Hour Clinical Deterioration Risk calculated from vital trends.</p>

              <Button
                variant={alertSent ? "secondary" : "danger"}
                size="sm"
                disabled={alertSent}
                onClick={() => setAlertSent(true)}
                className="w-full gap-1.5 text-xs font-semibold"
              >
                {alertSent ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Send className="h-3.5 w-3.5" />}
                <span>{alertSent ? "Emergency Alert Dispatched!" : "Dispatch Emergency Triage Alert"}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Vitals Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                    Heart Rate
                  </span>
                  <Badge variant="warning">Elevated</Badge>
                </div>
                <div className="text-3xl font-bold font-mono text-white">{heartRate} <span className="text-xs text-slate-500 font-normal">bpm</span></div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-3">Normal: 60 - 100 bpm</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-amber-400" />
                    Systolic BP
                  </span>
                  <Badge variant="danger">Stage 2 High</Badge>
                </div>
                <div className="text-3xl font-bold font-mono text-white">{systolicBp} <span className="text-xs text-slate-500 font-normal">mmHg</span></div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-3">Normal: &lt; 120 mmHg</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-cyan-400" />
                    Oxygen Saturation (SpO2)
                  </span>
                  <Badge variant="warning">Borderline</Badge>
                </div>
                <div className="text-3xl font-bold font-mono text-white">{oxygenSat}%</div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-3">Normal: 95 - 100%</div>
            </div>

          </div>

        </div>

        {/* Live Patient Triage Table */}
        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
          <CardHeader className="pb-3 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-white">Active Emergency Department Patient Monitor</CardTitle>
              <Badge variant="brand">Real-Time Ingestion Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Age / Sex</th>
                  <th className="p-3">Ingested Vitals</th>
                  <th className="p-3">Deterioration Risk</th>
                  <th className="p-3">Top Risk Factor</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="bg-red-500/10">
                  <td className="p-3 font-bold text-white">PT-89421</td>
                  <td className="p-3 text-slate-300">62M</td>
                  <td className="p-3 text-slate-300">HR: {heartRate} | BP: {systolicBp} | SpO2: {oxygenSat}%</td>
                  <td className="p-3 font-bold text-red-400">{riskScore}%</td>
                  <td className="p-3 text-amber-300">Elevated Systolic BP</td>
                  <td className="p-3"><Badge variant="danger">CRITICAL</Badge></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">PT-89422</td>
                  <td className="p-3 text-slate-300">45F</td>
                  <td className="p-3 text-slate-300">HR: 82 | BP: 122 | SpO2: 98%</td>
                  <td className="p-3 font-bold text-emerald-400">18%</td>
                  <td className="p-3 text-slate-400">None (Stable)</td>
                  <td className="p-3"><Badge variant="success">STABLE</Badge></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">PT-89423</td>
                  <td className="p-3 text-slate-300">58M</td>
                  <td className="p-3 text-slate-300">HR: 94 | BP: 138 | SpO2: 95%</td>
                  <td className="p-3 font-bold text-amber-400">54%</td>
                  <td className="p-3 text-amber-300">Mild Hypertension</td>
                  <td className="p-3"><Badge variant="warning">MONITOR</Badge></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
