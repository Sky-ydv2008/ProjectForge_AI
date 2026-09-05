"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CandidateGenerator } from "@/components/projects/CandidateGenerator";

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <CandidateGenerator />
      </div>
    </ProtectedRoute>
  );
}
