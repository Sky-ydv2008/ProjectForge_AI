import { z } from "zod";

export const githubConnectionSchema = z.object({
  isConnected: z.boolean(),
  username: z.string().optional(),
  avatarUrl: z.string().optional(),
  scopes: z.array(z.string()).default(["repo", "user"]),
  connectedAt: z.string().optional(),
});

export const publishRepoConfigSchema = z.object({
  repositoryName: z.string().min(3, "Repository name must be at least 3 characters").regex(/^[a-zA-Z0-9_.-]+$/, "Invalid repository name"),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
  framework: z.string().default("nextjs"),
  buildCommand: z.string().default("npm run build"),
  outputDirectory: z.string().default(".next"),
});

export const preflightCheckSchema = z.object({
  packageJsonValid: z.boolean(),
  noSecretsCommitted: z.boolean(),
  envVarsIdentified: z.boolean(),
  buildCommandKnown: z.boolean(),
  frameworkDetected: z.boolean(),
  readmeGenerated: z.boolean(),
});

export type GitHubConnectionState = z.infer<typeof githubConnectionSchema>;
export type PublishRepoConfig = z.infer<typeof publishRepoConfigSchema>;
export type PreflightCheckResult = z.infer<typeof preflightCheckSchema>;
