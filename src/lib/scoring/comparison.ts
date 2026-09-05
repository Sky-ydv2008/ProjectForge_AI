import { StudentProfileInput } from "@/lib/validation/profile";
import { AIProjectCandidate } from "@/lib/validation/ai-generation";
import { calculateDeterministicHealthScore, ScoreBreakdown } from "./engine";

export interface CandidateComparisonResult {
  candidate: AIProjectCandidate;
  scoreBreakdown: ScoreBreakdown;
  isTopRecommended: boolean;
  recommendationReason: string;
}

export interface ProjectComparisonAnalysis {
  results: CandidateComparisonResult[];
  recommendedCandidate: CandidateComparisonResult;
  comparisonSummary: string;
}

/**
 * Optimized Deterministic Side-by-Side Comparison Engine
 */
export function compareProjectCandidates(
  profile: StudentProfileInput,
  candidates: AIProjectCandidate[]
): ProjectComparisonAnalysis {
  const count = candidates.length;
  const results: CandidateComparisonResult[] = new Array(count);

  // Single pass calculation of candidate scores
  for (let i = 0; i < count; i++) {
    const cand = candidates[i];
    const scoreBreakdown = calculateDeterministicHealthScore(profile, cand);
    results[i] = {
      candidate: cand,
      scoreBreakdown,
      isTopRecommended: false,
      recommendationReason: "",
    };
  }

  // Sort by overall score descending
  results.sort((a, b) => b.scoreBreakdown.overallScore - a.scoreBreakdown.overallScore);

  // Mark #1 top recommended
  if (results.length > 0) {
    const winner = results[0];
    winner.isTopRecommended = true;
    
    const skillFit = winner.scoreBreakdown.dimensions.skillFit.score;
    const feas = winner.scoreBreakdown.dimensions.feasibility.score;
    
    winner.recommendationReason = `#1 Winner: Achieves optimal balance of high Skill Fit (${skillFit}/100) and Feasibility (${feas}/100) tailored to your ${profile.team_size}-person team and ${profile.timeline_months}-month deadline.`;
  }

  // Generate explanation rationale for other candidates
  const topScore = results[0]?.scoreBreakdown.overallScore || 0;
  for (let i = 1; i < results.length; i++) {
    const item = results[i];
    const scoreDiff = topScore - item.scoreBreakdown.overallScore;
    if (item.scoreBreakdown.healthCategory === "SCOPE EXPLOSION DETECTED") {
      item.recommendationReason = `High Risk: Contains feature bloat or hardware dependencies requiring Scope Explosion Rescue (${scoreDiff} pts behind recommended).`;
    } else {
      item.recommendationReason = `Alternative Option: Score is ${scoreDiff} points behind the recommended MVP project.`;
    }
  }

  const recommendedCandidate = results[0];
  const comparisonSummary = `Based on your profile (${profile.field}, ${profile.team_size} members, ${profile.timeline_months} months timeline), "${recommendedCandidate.candidate.title}" is recommended as the highest feasibility MVP project (${recommendedCandidate.scoreBreakdown.overallScore}/100 Health Score).`;

  return {
    results,
    recommendedCandidate,
    comparisonSummary,
  };
}
