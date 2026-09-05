"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { StudentProfileInput, DEFAULT_DEMO_PROFILE_INPUT, studentProfileSchema } from "@/lib/validation/profile";
import { isSupabaseConfigured, createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  profile: StudentProfileInput | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  saveProfile: (data: StudentProfileInput) => Promise<boolean>;
  loadDemoProfile: () => void;
  isProfileComplete: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const PROFILE_STORAGE_KEY = "projectforge_student_profile";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfileInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);

      // Check localStorage first
      const cached = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setProfile(parsed);
          setLoading(false);
          return;
        } catch {
          // fallback to DB / default
        }
      }

      // If Supabase is connected and user is logged in
      if (isSupabaseConfigured && user && !user.isDemoUser) {
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          const { data, error: dbErr } = await supabase
            .from("student_profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (data && !dbErr) {
            const mappedProfile: StudentProfileInput = {
              field: data.field,
              degree: data.degree,
              skills: data.skills || [],
              interests: data.interests || [],
              experience: data.experience || "intermediate",
              team_size: data.team_size || 1,
              timeline_months: data.timeline_months || 4,
              budget: data.budget || "free",
              hardware: data.hardware || "standard_laptop",
              career_goal: data.career_goal || "Software Engineer",
              difficulty: data.difficulty || "balanced_innovation",
            };
            setProfile(mappedProfile);
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(mappedProfile));
            setLoading(false);
            return;
          }
        }
      }

      // Default demo profile for instant testing
      setProfile(DEFAULT_DEMO_PROFILE_INPUT);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_PROFILE_INPUT));
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  const saveProfile = async (data: StudentProfileInput): Promise<boolean> => {
    setSaving(true);
    setError(null);

    // Validate with Zod
    const validationResult = studentProfileSchema.safeParse(data);
    if (!validationResult.success) {
      const issueMsg = validationResult.error.issues.map((i) => i.message).join(". ");
      setError(issueMsg);
      setSaving(false);
      return false;
    }

    // Persist locally
    setProfile(data);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));

    // If Supabase is connected, save to DB
    if (isSupabaseConfigured && user && !user.isDemoUser) {
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const { error: upsertErr } = await supabase.from("student_profiles").upsert({
          user_id: user.id,
          field: data.field,
          degree: data.degree,
          skills: data.skills,
          interests: data.interests,
          experience: data.experience,
          team_size: data.team_size,
          timeline_months: data.timeline_months,
          budget: data.budget,
          hardware: data.hardware,
          career_goal: data.career_goal,
          difficulty: data.difficulty,
          updated_at: new Date().toISOString(),
        });

        if (upsertErr) {
          console.warn("Supabase upsert warning:", upsertErr.message);
        }
      }
    }

    setSaving(false);
    return true;
  };

  const loadDemoProfile = () => {
    setProfile(DEFAULT_DEMO_PROFILE_INPUT);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_PROFILE_INPUT));
    setError(null);
  };

  const isProfileComplete = Boolean(
    profile && profile.field && profile.degree && profile.skills.length > 0
  );

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        saving,
        error,
        saveProfile,
        loadDemoProfile,
        isProfileComplete,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
