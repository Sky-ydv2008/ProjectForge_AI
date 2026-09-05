export interface DeploymentEnvVar {
  key: string;
  value: string;
  isSecret: boolean;
  isRequired: boolean;
}

export interface DeploymentConfig {
  projectId: string;
  provider: "vercel" | "render" | "netlify";
  repositoryName: string;
  repositoryUrl: string;
  branch: string;
  framework: string;
  buildCommand: string;
  outputDirectory: string;
  envVars: DeploymentEnvVar[];
}

export interface DeploymentStatusResult {
  deploymentId: string;
  provider: "vercel" | "render" | "netlify";
  status: "pending" | "building" | "live" | "failed";
  deploymentUrl: string;
  commitSha: string;
  logs: string[];
  errorMessage?: string;
  deployedAt: string;
}

export interface DeploymentProviderAdapter {
  providerName: "vercel" | "render" | "netlify";
  validateConfig(config: DeploymentConfig): Promise<boolean>;
  deploy(config: DeploymentConfig): Promise<DeploymentStatusResult>;
  getDeploymentStatus(deploymentId: string): Promise<DeploymentStatusResult>;
}
