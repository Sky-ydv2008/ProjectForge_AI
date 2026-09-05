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
 * Deterministic Side-by-Side Comparison Engine
 */
export function compareProjectCandidates(
  profile: StudentProfileInput,
  candidates: AIProjectCandidate[]
): ProjectComparisonAnalysis {
  const evaluated = candidates.map((cand) => {
    const scoreBreakdown = calculateDeterministicHealthScore(profile, cand);
    return {
      candidate: cand,
      scoreBreakdown,
      isTopRecommended: false,
      recommendationReason: "",
    };
  });

  // Sort by overall score descending
  evaluated.sort((a, b) => b.scoreBreakdown.overallScore - a.scoreBreakdown.overallScore);

  // Mark #1 top recommended
  if (evaluated.length > 0) {
    const winner = evaluated[0];
    winner.isTopRecommended = true;
    
    const skillFit = winner.scoreBreakdown.dimensions.skillFit.score;
    const feas = winner.scoreBreakdown.dimensions.feasibility.score;
    
    winner.recommendationReason = `#1 Winner: Achieves optimal balance of high Skill Fit (${skillFit}/100) and Feasibility (${feas}/100) tailored to your ${profile.team_size}-person team and ${profile.timeline_months}-month deadline.`;
  }

  // Generate explanation rationale for other candidates
  evaluated.forEach((item, index) => {
    if (index > 0) {
      const topScore = evaluated[0].scoreBreakdown.overallScore;
      const scoreDiff = topScore - item.scoreBreakdown.overallScore;
      if (item.scoreBreakdown.healthCategory === "SCOPE EXPLOSION DETECTED") {
        item.recommendationReason = `High Risk: Contains feature bloat or hardware dependencies requiring Scope Explosion Rescue. (${scoreDiff} pts lower than recommended).`;
      } else {
        item.recommendationReason = `Alternative Option: Score is ${scoreDiff} points behind the recommended MVP project.`;
      }
    }
  });

  const recommendedCandidate = evaluated[0];

  const comparisonSummary = `Based on your profile (${profile.field}, ${profile.team_size} members, ${profile.timeline_months} months timeline), "${recommendedCandidate.candidate.title}" is recommended as the highest feasibility MVP project (${recommendedCandidate.scoreBreakdown.overallScore}/100 Health Score).`;

  return {
    results: evaluated,
    recommendedCandidate,
    comparisonSummary,
  };
}
