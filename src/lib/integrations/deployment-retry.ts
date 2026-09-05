import { DeploymentStatusResult } from "./deployment-provider";

export interface DiagnosticDiagnosis {
  cause: string;
  recommendation: string;
  actionableStep: string;
}

/**
 * Diagnostic Failure Recovery Engine
 */
export function diagnoseDeploymentFailure(
  errorMessage?: string,
  logs: string[] = []
): DiagnosticDiagnosis {
  const fullText = `${errorMessage || ""} ${logs.join(" ")}`.toLowerCase();

  if (fullText.includes("supabase") || fullText.includes("env") || fullText.includes("missing_env_var")) {
    return {
      cause: "BUILD FAILED Cause: missing NEXT_PUBLIC_SUPABASE_URL environment variable.",
      recommendation: "Fix: Add the missing environment variable key in the provider configuration mapping and retry.",
      actionableStep: "Check environment variables checklist and supply NEXT_PUBLIC_SUPABASE_URL value.",
    };
  }

  if (fullText.includes("type_error") || fullText.includes("typescript") || fullText.includes("compile")) {
    return {
      cause: "BUILD FAILED Cause: TypeScript type check error during `npm run build`.",
      recommendation: "Fix: Re-run local build preflight check to resolve missing import or type mismatch.",
      actionableStep: "Verify imports in project components and run `npm run build`.",
    };
  }

  if (fullText.includes("timeout") || fullText.includes("network") || fullText.includes("504")) {
    return {
      cause: "BUILD FAILED Cause: Network connection timeout connecting to deployment provider API.",
      recommendation: "Fix: Network service temporarily unavailable. Click Retry Deployment below.",
      actionableStep: "Click 'Retry Deployment' to re-submit build request.",
    };
  }

  return {
    cause: "BUILD FAILED Cause: Missing runtime environment variable configuration.",
    recommendation: "Fix: Verify environment variables mapping, re-run preflight check, and click Retry.",
    actionableStep: "Review environment variables and retry deployment.",
  };
}
