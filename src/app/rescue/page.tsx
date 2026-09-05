"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RescueCenter } from "@/components/rescue/RescueCenter";

export default function RescuePage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <RescueCenter />
      </div>
    </ProtectedRoute>
  );
}
