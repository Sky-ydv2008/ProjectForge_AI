"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, AuthState } from "@/lib/supabase/types";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { DEMO_STUDENT_PROFILE } from "@/lib/supabase/demo-user";

interface AuthContextType extends AuthState {
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  signupWithEmail: (email: string, pass: string, fullName: string) => Promise<boolean>;
  loginWithGithub: () => Promise<void>;
  loginAsDemoUser: () => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = "projectforge_demo_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    async function initAuth() {
      setLoading(true);

      // Check if real Supabase client is configured
      if (isSupabaseConfigured) {
        setIsDemoMode(false);
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Student User",
              avatarUrl: session.user.user_metadata?.avatar_url,
              createdAt: session.user.created_at,
            });
          }
        }
      } else {
        // Default to Demo Mode when Supabase is unconfigured or DEMO_MODE=true
        setIsDemoMode(true);
        const savedDemoUser = localStorage.getItem(DEMO_STORAGE_KEY);
        if (savedDemoUser) {
          try {
            setUser(JSON.parse(savedDemoUser));
          } catch {
            setUser(DEMO_STUDENT_PROFILE);
          }
        } else {
          // Auto log-in demo student for seamless hackathon testing experience
          setUser(DEMO_STUDENT_PROFILE);
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_STUDENT_PROFILE));
        }
      }

      setLoading(false);
    }

    initAuth();
  }, []);

  const loginAsDemoUser = () => {
    setUser(DEMO_STUDENT_PROFILE);
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_STUDENT_PROFILE));
    setError(null);
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      // In demo mode, simulate authentication
      if (email.trim() && pass.trim()) {
        const demoProfile: UserProfile = {
          ...DEMO_STUDENT_PROFILE,
          email: email.trim(),
          fullName: email.split("@")[0] || "Student User",
        };
        setUser(demoProfile);
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoProfile));
        setLoading(false);
        return true;
      } else {
        setError("Please enter a valid email and password.");
        setLoading(false);
        return false;
      }
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase client is not available.");
      setLoading(false);
      return false;
    }

    const { data, error: authErr } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (authErr) {
      setError(authErr.message);
      setLoading(false);
      return false;
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || email,
        fullName: data.user.user_metadata?.full_name || email.split("@")[0],
        createdAt: data.user.created_at,
      });
    }

    setLoading(false);
    return true;
  };

  const signupWithEmail = async (email: string, pass: string, fullName: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      const demoProfile: UserProfile = {
        ...DEMO_STUDENT_PROFILE,
        email: email.trim(),
        fullName: fullName.trim() || "Student User",
      };
      setUser(demoProfile);
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoProfile));
      setLoading(false);
      return true;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase client not available.");
      setLoading(false);
      return false;
    }

    const { data, error: authErr } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authErr) {
      setError(authErr.message);
      setLoading(false);
      return false;
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || email,
        fullName,
        createdAt: data.user.created_at,
      });
    }

    setLoading(false);
    return true;
  };

  const loginWithGithub = async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      loginAsDemoUser();
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
    }
  };

  const logout = async () => {
    setLoading(true);
    if (isSupabaseConfigured) {
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    localStorage.removeItem(DEMO_STORAGE_KEY);
    setUser(null);
    setLoading(false);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isDemoMode,
        loginWithEmail,
        signupWithEmail,
        loginWithGithub,
        loginAsDemoUser,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
