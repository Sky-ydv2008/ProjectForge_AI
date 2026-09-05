"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <OnboardingWizard />
      </div>
    </ProtectedRoute>
  );
}
