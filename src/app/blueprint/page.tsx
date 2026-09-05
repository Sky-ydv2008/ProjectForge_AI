"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { BlueprintViewer } from "@/components/blueprint/BlueprintViewer";
import { useProfile } from "@/context/ProfileContext";
import { DEMO_PROJECT_BLUEPRINT } from "@/lib/ai/fixtures/blueprint-fixtures";
import { ProjectBlueprint } from "@/lib/validation/blueprint";
import { Button } from "@/components/ui/Button";
import { Sparkles, Cpu } from "lucide-react";

export default function BlueprintPage() {
  const { profile } = useProfile();
  const [blueprint, setBlueprint] = useState<ProjectBlueprint>(DEMO_PROJECT_BLUEPRINT);
  const [generating, setGenerating] = useState(false);

  const handleGenerateBlueprint = async () => {
    if (!profile) return;
    setGenerating(true);

    try {
      const res = await fetch("/api/projects/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      const data = await res.json();
      if (data.success && data.blueprint) {
        setBlueprint(data.blueprint);
      }
    } catch (err) {
      console.error("Blueprint generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <BlueprintViewer blueprint={blueprint} onGenerateRoadmap={() => {}} />
      </div>
    </ProtectedRoute>
  );
}
