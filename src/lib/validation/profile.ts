import { z } from "zod";

export const studentProfileSchema = z.object({
  field: z.string().min(2, "Field of study is required"),
  degree: z.string().min(2, "Degree and year are required"),
  skills: z.array(z.string()).min(1, "Select at least one skill/language"),
  interests: z.array(z.string()).min(1, "Select at least one domain interest"),
  experience: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Please select your experience level",
  }),
  team_size: z.number().min(1, "Team size must be at least 1").max(6, "Maximum team size is 6"),
  timeline_months: z.number().min(1, "Timeline must be at least 1 month").max(12, "Timeline cannot exceed 12 months"),
  budget: z.enum(["free", "low", "medium", "flexible"], {
    message: "Please select your budget range",
  }),
  hardware: z.enum(["standard_laptop", "gpu_laptop", "cloud_credits", "custom_hardware"], {
    message: "Please select your hardware constraints",
  }),
  career_goal: z.string().min(2, "Career goal is required"),
  difficulty: z.enum(["feasible_mvp", "balanced_innovation", "ambitious_high_risk"], {
    message: "Please select target difficulty",
  }),
});

export type StudentProfileInput = z.infer<typeof studentProfileSchema>;

export const DEFAULT_DEMO_PROFILE_INPUT: StudentProfileInput = {
  field: "Computer Science & AI",
  degree: "B.Tech Computer Science — 7th Semester",
  skills: ["Python", "React", "TypeScript", "FastAPI", "PyTorch", "Tailwind CSS"],
  interests: ["Healthcare AI", "Predictive Analytics", "Full-Stack Web SaaS"],
  experience: "intermediate",
  team_size: 3,
  timeline_months: 4,
  budget: "free",
  hardware: "standard_laptop",
  career_goal: "AI/ML Software Engineer",
  difficulty: "balanced_innovation",
};
