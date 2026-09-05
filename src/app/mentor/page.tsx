"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MentorChat } from "@/components/mentor/MentorChat";

export default function MentorPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <MentorChat />
      </div>
    </ProtectedRoute>
  );
}
