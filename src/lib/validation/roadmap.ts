import { z } from "zod";

export const roadmapTaskSchema = z.object({
  id: z.string(),
  phase: z.string(),
  task: z.string(),
  description: z.string().optional(),
  estimated_days: z.number().default(2),
  status: z.enum(["pending", "in_progress", "completed", "blocked"]).default("pending"),
  order_index: z.number().default(0),
});

export const projectRoadmapSchema = z.object({
  projectId: z.string(),
  projectTitle: z.string(),
  tasks: z.array(roadmapTaskSchema),
});

export type RoadmapTask = z.infer<typeof roadmapTaskSchema>;
export type ProjectRoadmap = z.infer<typeof projectRoadmapSchema>;
