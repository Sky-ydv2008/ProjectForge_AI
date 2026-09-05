import { z } from "zod";

export const aiFeatureSchema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.enum(["MUST HAVE", "SHOULD HAVE", "COULD HAVE", "REMOVE"]),
  estimated_days: z.number().default(3),
});

export const aiRiskSchema = z.object({
  risk: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  probability: z.enum(["low", "medium", "high"]).default("medium"),
  impact: z.string(),
  mitigation: z.string(),
});

export const aiProjectCandidateSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  summary: z.string(),
  problem: z.string(),
  solution: z.string(),
  target_users: z.array(z.string()).default([]),
  required_skills: z.array(z.string()),
  technologies: z.array(z.string()),
  features: z.array(aiFeatureSchema),
  optional_features: z.array(z.string()).default([]),
  complexity: z.number().min(1).max(10),
  risks: z.array(aiRiskSchema),
  skill_gaps: z.array(z.string()).default([]),
  demo_flow: z.array(z.string()).default([]),
  innovation_opportunities: z.array(z.string()).default([]),
});

export const aiGenerationOutputSchema = z.object({
  projects: z.array(aiProjectCandidateSchema).min(1),
});

export type AIProjectCandidate = z.infer<typeof aiProjectCandidateSchema>;
export type AIGenerationOutput = z.infer<typeof aiGenerationOutputSchema>;
