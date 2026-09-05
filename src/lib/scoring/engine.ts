import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";

export interface ScoreDimension {
  name: string;
  weight: number; // e.g. 0.25 for 25%
  score: number; // 0 - 100
  weightedScore: number;
  explanation: string;
  status: "excellent" | "good" | "warning" | "danger";
}

export interface ScoreBreakdown {
  overallScore: number;
  healthCategory: "FEASIBLE MVP" | "MODERATE RISK" | "SCOPE EXPLOSION DETECTED";
  colorTheme: "success" | "warning" | "danger";
  dimensions: {
    skillFit: ScoreDimension;
    feasibility: ScoreDimension;
    innovation: ScoreDimension;
    careerValue: ScoreDimension;
    demoPotential: ScoreDimension;
    riskAdjustment: ScoreDimension;
  };
  recommendation: string;
}

/**
 * Deterministic Application Scoring Engine
 * Formula: overall = skill_fit*0.25 + feasibility*0.20 + innovation*0.20 + career_value*0.15 + demo_potential*0.10 + risk_adjustment*0.10
 */
export function calculateDeterministicHealthScore(
  profile: StudentProfileInput,
  candidate: AIProjectCandidate
): ScoreBreakdown {
  // 1. Skill Fit Score (25%)
  const required = candidate.required_skills.map((s) => s.toLowerCase());
  const studentSkills = profile.skills.map((s) => s.toLowerCase());
  const matchedCount = required.filter((req) => studentSkills.some((sk) => sk.includes(req) || req.includes(sk))).length;
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

  // 2. Feasibility Score (20%)
  const activeFeatures = candidate.features.filter((f) => f.priority !== "REMOVE");
  const removedFeatures = candidate.features.filter((f) => f.priority === "REMOVE");
  const totalFeatureDays = activeFeatures.reduce((acc, f) => acc + (f.estimated_days || 3), 0);
  
  // Available student capacity in work-days
  const capacityDays = profile.timeline_months * 15 * profile.team_size; 
  const loadRatio = totalFeatureDays / Math.max(1, capacityDays);

  let rawFeasibility = 85;
  if (removedFeatures.length > 0 && candidate.features.length >= 5) {
    // Unrescoped scope explosion penalty
    rawFeasibility = 35;
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
  const baseInnovation = candidate.complexity * 9;
  const rawInnovation = Math.min(100, Math.max(40, baseInnovation + 10));

  const innovation: ScoreDimension = {
    name: "Innovation & Tech Depth",
    weight: 0.20,
    score: rawInnovation,
    weightedScore: Math.round(rawInnovation * 0.20),
    explanation: `Complexity rating ${candidate.complexity}/10 with ${candidate.technologies.length} modern stack components.`,
    status: rawInnovation >= 75 ? "excellent" : "good",
  };

  // 4. Career Value Score (15%)
  const goal = profile.career_goal.toLowerCase();
  const techMatch = candidate.technologies.some((t) => goal.includes(t.toLowerCase()) || t.toLowerCase().includes("ai") || t.toLowerCase().includes("react"));
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
  const hasDemoFlow = candidate.demo_flow.length >= 3;
  const rawDemo = hasDemoFlow ? 95 : 70;

  const demoPotential: ScoreDimension = {
    name: "Demo Potential",
    weight: 0.10,
    score: rawDemo,
    weightedScore: Math.round(rawDemo * 0.10),
    explanation: `${candidate.demo_flow.length} clear presentation steps verified for hackathon judging.`,
    status: rawDemo >= 80 ? "excellent" : "good",
  };

  // 6. Risk Adjustment Score (10%)
  const highRisks = candidate.risks.filter((r) => r.severity === "high").length;
  const rawRisk = Math.max(30, 100 - highRisks * 25 - candidate.risks.length * 5);

  const riskAdjustment: ScoreDimension = {
    name: "Risk Adjustment",
    weight: 0.10,
    score: rawRisk,
    weightedScore: Math.round(rawRisk * 0.10),
    explanation: `${candidate.risks.length} identified risks (${highRisks} high severity).`,
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
