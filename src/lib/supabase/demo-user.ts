import { UserProfile } from "./types";

export const DEMO_STUDENT_PROFILE: UserProfile = {
  id: "demo-student-uuid-12345",
  email: "alex.student@forge.ai",
  fullName: "Alex Chen (Demo Student)",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  field: "Computer Science & AI",
  degree: "B.Tech Computer Science — 7th Semester",
  skills: ["Python", "React", "TypeScript", "FastAPI", "PyTorch", "Tailwind CSS"],
  isDemoUser: true,
  createdAt: new Date().toISOString(),
};
