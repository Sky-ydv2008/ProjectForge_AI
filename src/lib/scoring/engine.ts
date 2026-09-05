/**
 * @file engine.ts
 * @description Deterministic 6-Factor Project Health Scoring Engine for ProjectForge AI.
 * Computes Skill Fit (25%), Feasibility (20%), Innovation (20%), Career Value (15%), Demo Potential (10%), and Risk Adjustment (10%).
 * @module ScoringEngine
 */

import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";

/**
 * Interface representing an individual score dimension calculation.
 */
export interface ScoreDimension {
  /** Name of the score dimension */
  name: string;
  /** Mathematical weight (e.g., 0.25 for 25%) */
  weight: number;
  /** Calculated dimension score from 0 to 100 */
  score: number;
  /** Weighted contribution to overall health score */
  weightedScore: number;
  /** Transparent human-readable mathematical explanation */
  explanation: string;
  /** Status classification */
  status: "excellent" | "good" | "warning" | "danger";
}

/**
 * Interface representing the complete 6-factor health score breakdown result.
 */
export interface ScoreBreakdown {
  /** Total calculated health score from 0 to 100 */
  overallScore: number;
  /** Diagnostic health classification category */
  healthCategory: "FEASIBLE MVP" | "MODERATE RISK" | "SCOPE EXPLOSION DETECTED";
  /** UI color theme representation */
  colorTheme: "success" | "warning" | "danger";
  /** Individual dimension breakdown object */
  dimensions: {
    skillFit: ScoreDimension;
    feasibility: ScoreDimension;
    innovation: ScoreDimension;
    careerValue: ScoreDimension;
    demoPotential: ScoreDimension;
    riskAdjustment: ScoreDimension;
  };
  /** Architectural recommendation note */
  recommendation: string;
}

/**
 * Calculates a deterministic health score for a project candidate based on student constraints.
 * 
 * Mathematical Formula:
 * Overall Health = (SkillFit * 0.25) + (Feasibility * 0.20) + (Innovation * 0.20) + (CareerValue * 0.15) + (DemoPotential * 0.10) + (RiskAdjustment * 0.10)
 * 
 * @param {StudentProfileInput} profile - The validated student profile input.
 * @param {AIProjectCandidate} candidate - The candidate project object to evaluate.
 * @returns {ScoreBreakdown} The structured score breakdown result.
 */
export function calculateDeterministicHealthScore(
  profile: StudentProfileInput,
  candidate: AIProjectCandidate
): ScoreBreakdown {
  // 1. Skill Fit Score (25%) - Pre-lowercase skills set for O(1) lookup
  const studentSkills = profile.skills || [];
  const studentSkillSet = new Set(studentSkills.map((s) => s.toLowerCase().trim()));
  const required = candidate.required_skills || [];
  
  let matchedCount = 0;
  for (let i = 0; i < required.length; i++) {
    const req = required[i].toLowerCase().trim();
    if (studentSkillSet.has(req)) {
      matchedCount++;
    } else {
      for (const sk of studentSkillSet) {
        if (sk.includes(req) || req.includes(sk)) {
          matchedCount++;
          break;
        }
      }
    }
  }

  const matchRatio = required.length > 0 ? matchedCount / required.length : 0.8;
  const expBonus = profile.experience === "advanced" ? 20 : profile.experience === "intermediate" ? 10 : 0;
  const rawSkillFit = Math.min(100, Math.round(matchRatio * 80 + expBonus));
  
  const skillFit: ScoreDimension = {
    name: "Skill Fit",
    weight: 0.25,
    score: rawSkillFit,
    weightedScore: Math.round(rawSkillFit * 0.25),
    explanation: `${matchedCount}/${required.length} required skills matched (${Math.round(matchRatio * 100)}% match) + ${profile.experience} experience bonus.`,
    status: rawSkillFit >= 75 ? "excellent" : rawSkillFit >= 60 ? "good" : "warning",
  };

  // 2. Feasibility Score (20%) - Single-pass feature computation
  let totalFeatureDays = 0;
  let hasRemoveFeatures = false;
  
  const features = candidate.features || [];
  for (let i = 0; i < features.length; i++) {
    const f = features[i];
    if (f.priority === "REMOVE") {
      hasRemoveFeatures = true;
    } else {
      totalFeatureDays += f.estimated_days || 3;
    }
  }
  
  const capacityDays = (profile.timeline_months || 4) * 15 * (profile.team_size || 1); 
  const loadRatio = totalFeatureDays / Math.max(1, capacityDays);

  let rawFeasibility = 85;
  if (hasRemoveFeatures && features.length >= 5) {
    rawFeasibility = 35; // Unrescoped scope explosion penalty
  } else if (loadRatio > 1.2) {
    rawFeasibility = 45;
  } else if (loadRatio > 0.8) {
    rawFeasibility = 70;
  } else {
    rawFeasibility = 95;
  }

  const feasibility: ScoreDimension = {
    name: "Feasibility",
    weight: 0.20,
    score: rawFeasibility,
    weightedScore: Math.round(rawFeasibility * 0.20),
    explanation: `${totalFeatureDays} estimated build days vs ${capacityDays} total capacity days (${profile.team_size} members, ${profile.timeline_months} months).`,
    status: rawFeasibility >= 80 ? "excellent" : rawFeasibility >= 60 ? "good" : "danger",
  };

  // 3. Innovation Score (20%)
  const complexity = candidate.complexity || 5;
  const baseInnovation = complexity * 9;
  const rawInnovation = Math.min(100, Math.max(40, baseInnovation + 10));

  const innovation: ScoreDimension = {
    name: "Innovation & Tech Depth",
    weight: 0.20,
    score: rawInnovation,
    weightedScore: Math.round(rawInnovation * 0.20),
    explanation: `Complexity rating ${complexity}/10 with ${(candidate.technologies || []).length} modern stack components.`,
    status: rawInnovation >= 75 ? "excellent" : "good",
  };

  // 4. Career Value Score (15%)
  const goal = (profile.career_goal || "").toLowerCase();
  let techMatch = false;
  const techs = candidate.technologies || [];
  for (let i = 0; i < techs.length; i++) {
    const t = techs[i].toLowerCase();
    if (goal.includes(t) || t.includes("ai") || t.includes("react") || t.includes("java")) {
      techMatch = true;
      break;
    }
  }
  const rawCareer = techMatch ? 90 : 75;

  const careerValue: ScoreDimension = {
    name: "Career Value",
    weight: 0.15,
    score: rawCareer,
    weightedScore: Math.round(rawCareer * 0.15),
    explanation: `Aligned with student career goal: "${profile.career_goal}".`,
    status: rawCareer >= 80 ? "excellent" : "good",
  };

  // 5. Demo Potential Score (10%)
  const demoFlow = candidate.demo_flow || [];
  const rawDemo = demoFlow.length >= 3 ? 95 : 70;

  const demoPotential: ScoreDimension = {
    name: "Demo Potential",
    weight: 0.10,
    score: rawDemo,
    weightedScore: Math.round(rawDemo * 0.10),
    explanation: `${demoFlow.length} clear presentation steps verified for hackathon judging.`,
    status: rawDemo >= 80 ? "excellent" : "good",
  };

  // 6. Risk Adjustment Score (10%)
  const risks = candidate.risks || [];
  let highRisks = 0;
  for (let i = 0; i < risks.length; i++) {
    if (risks[i].severity === "high") highRisks++;
  }
  const rawRisk = Math.max(30, 100 - highRisks * 25 - risks.length * 5);

  const riskAdjustment: ScoreDimension = {
    name: "Risk Adjustment",
    weight: 0.10,
    score: rawRisk,
    weightedScore: Math.round(rawRisk * 0.10),
    explanation: `${risks.length} identified risks (${highRisks} high severity).`,
    status: rawRisk >= 75 ? "excellent" : rawRisk >= 50 ? "warning" : "danger",
  };

  // Compute exact overall score via formula
  const overallScore = Math.round(
    skillFit.weightedScore +
    feasibility.weightedScore +
    innovation.weightedScore +
    careerValue.weightedScore +
    demoPotential.weightedScore +
    riskAdjustment.weightedScore
  );

  let healthCategory: ScoreBreakdown["healthCategory"] = "FEASIBLE MVP";
  let colorTheme: ScoreBreakdown["colorTheme"] = "success";

  if (overallScore < 60 || rawFeasibility < 50) {
    healthCategory = "SCOPE EXPLOSION DETECTED";
    colorTheme = "danger";
  } else if (overallScore < 80) {
    healthCategory = "MODERATE RISK";
    colorTheme = "warning";
  }

  let recommendation = "";
  if (healthCategory === "SCOPE EXPLOSION DETECTED") {
    recommendation = "Project contains scope bloat or hardware dependencies. Trigger Scope Explosion Rescue to prune bloat into a buildable MVP.";
  } else if (healthCategory === "MODERATE RISK") {
    recommendation = "Buildable project with moderate skill gaps. Review optional features before starting build.";
  } else {
    recommendation = "Highly buildable MVP project! Ready to generate Technical Blueprint and Roadmap.";
  }

  return {
    overallScore,
    healthCategory,
    colorTheme,
    dimensions: {
      skillFit,
      feasibility,
      innovation,
      careerValue,
      demoPotential,
      riskAdjustment,
    },
    recommendation,
  };
}
