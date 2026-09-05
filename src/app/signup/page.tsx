import React from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <AuthForm initialMode="signup" />
    </div>
  );
}
