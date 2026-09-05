"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoadmapTracker } from "@/components/roadmap/RoadmapTracker";
import { DEMO_PROJECT_ROADMAP } from "@/lib/ai/fixtures/roadmap-fixtures";
import { ProjectRoadmap } from "@/lib/validation/roadmap";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<ProjectRoadmap>(DEMO_PROJECT_ROADMAP);

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <RoadmapTracker initialRoadmap={roadmap} />
      </div>
    </ProtectedRoute>
  );
}
