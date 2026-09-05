"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Hammer, Github, Lock, Mail, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    loginWithEmail,
    signupWithEmail,
    loginWithGithub,
    loginAsDemoUser,
    error,
    clearError,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    clearError();

    let success = false;
    if (mode === "login") {
      success = await loginWithEmail(email, password);
    } else {
      success = await signupWithEmail(email, password, fullName);
    }

    setSubmitting(false);
    if (success) {
      router.push("/dashboard");
    }
  };

  const handleDemoClick = () => {
    loginAsDemoUser();
    router.push("/dashboard");
  };

  return (
    <Card glow="indigo" className="w-full max-w-md mx-auto shadow-2xl bg-slate-900 border-slate-800">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-glow-cyan mb-3">
          <Hammer className="h-6 w-6 text-slate-950 stroke-[2.5]" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          {mode === "login" ? "Welcome Back to ProjectForge" : "Create Student Account"}
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          {mode === "login"
            ? "Sign in to access your project candidates, blueprints & mentor"
            : "Register your student profile to evaluate, rescue & deploy realistic projects"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Demo Login Option for Judges & Testing */}
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Hackathon Judge Quick-Access</span>
            </span>
            <Badge variant="success" className="text-[10px]">Instant Demo</Badge>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            Skip registration and enter as pre-configured Demo Student (Alex Chen).
          </p>
          <Button
            type="button"
            variant="rescue"
            size="sm"
            onClick={handleDemoClick}
            className="w-full mt-1 text-xs gap-1.5"
          >
            <span>⚡ Instant Demo Student Login</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <span className="relative px-3 bg-slate-900 text-[11px] font-mono text-slate-500 uppercase">Or continue with credentials</span>
        </div>

        {/* Error message alert */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-400 hover:text-white text-sm font-bold">×</button>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Student Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.student@university.edu"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
            className="w-full mt-2"
          >
            {submitting ? "Authenticating..." : mode === "login" ? "Sign In to ProjectForge" : "Create Account & Continue"}
          </Button>
        </form>

        {/* GitHub OAuth Button */}
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => loginWithGithub()}
          className="w-full gap-2 text-xs"
        >
          <Github className="h-4 w-4 text-white" />
          <span>Continue with GitHub OAuth</span>
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-slate-800/80 pt-4">
        {mode === "login" ? (
          <p className="text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-xs text-slate-400">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Sign In
            </button>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
