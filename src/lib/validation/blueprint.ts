import { z } from "zod";

export const blueprintOverviewSchema = z.object({
  problemStatement: z.string(),
  solutionSummary: z.string(),
  targetUsers: z.array(z.string()),
  valueProposition: z.string(),
});

export const blueprintArchitectureSchema = z.object({
  topology: z.string(),
  frontendComponent: z.string(),
  backendComponent: z.string(),
  databaseComponent: z.string(),
  dataFlowDescription: z.string(),
});

export const blueprintFeatureSchema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.enum(["MUST HAVE", "SHOULD HAVE", "COULD HAVE", "REMOVE"]),
  estimatedDays: z.number(),
});

export const blueprintTechStackSchema = z.object({
  frontend: z.string(),
  backend: z.string(),
  database: z.string(),
  styling: z.string(),
  aiMlLibraries: z.array(z.string()),
  hosting: z.string(),
  rationale: z.string(),
});

export const blueprintDatabaseTableSchema = z.object({
  tableName: z.string(),
  columns: z.array(z.string()),
  primaryKey: z.string(),
  foreignKeys: z.array(z.string()),
  description: z.string(),
});

export const blueprintApiEndpointSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  route: z.string(),
  description: z.string(),
  accessLevel: z.string(),
});

export const blueprintSecuritySchema = z.object({
  authentication: z.string(),
  authorizationRls: z.string(),
  inputValidation: z.string(),
  secretManagement: z.string(),
});

export const blueprintDeploymentSchema = z.object({
  provider: z.string(),
  buildCommand: z.string(),
  envVarsRequired: z.array(z.string()),
  demoFlowSteps: z.array(z.string()),
});

export const projectBlueprintSchema = z.object({
  id: z.string(),
  projectTitle: z.string(),
  generatedAt: z.string(),
  overview: blueprintOverviewSchema,
  architecture: blueprintArchitectureSchema,
  features: z.array(blueprintFeatureSchema),
  techStack: blueprintTechStackSchema,
  databaseDesign: z.array(blueprintDatabaseTableSchema),
  apiEndpoints: z.array(blueprintApiEndpointSchema),
  securityModel: blueprintSecuritySchema,
  deploymentPlan: blueprintDeploymentSchema,
});

export type ProjectBlueprint = z.infer<typeof projectBlueprintSchema>;
