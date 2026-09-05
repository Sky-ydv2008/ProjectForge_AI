export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      student_profiles: {
        Row: {
          id: string;
          user_id: string;
          field: string;
          degree: string;
          skills: Json;
          interests: Json;
          experience: string;
          team_size: number;
          timeline_months: number;
          budget: string;
          hardware: string;
          career_goal: string;
          difficulty: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["student_profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["student_profiles"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          summary: string;
          problem: string;
          solution: string;
          required_skills: Json;
          technologies: Json;
          complexity: number;
          skill_fit_score: number;
          feasibility_score: number;
          innovation_score: number;
          career_score: number;
          demo_score: number;
          risk_score: number;
          overall_score: number;
          status: "candidate" | "selected" | "rescued" | "archived";
          blueprint_data: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      project_features: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          description: string | null;
          priority: "MUST HAVE" | "SHOULD HAVE" | "COULD HAVE" | "REMOVE";
          complexity: string;
          estimated_days: number;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["project_features"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["project_features"]["Insert"]>;
      };
      project_risks: {
        Row: {
          id: string;
          project_id: string;
          risk: string;
          severity: string;
          probability: string;
          impact: string;
          mitigation: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["project_risks"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["project_risks"]["Insert"]>;
      };
      project_roadmap: {
        Row: {
          id: string;
          project_id: string;
          phase: string;
          task: string;
          description: string | null;
          estimated_days: number;
          status: "pending" | "in_progress" | "completed" | "blocked";
          order_index: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["project_roadmap"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["project_roadmap"]["Insert"]>;
      };
      mentor_messages: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["mentor_messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["mentor_messages"]["Insert"]>;
      };
      github_connections: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          provider_user_id: string | null;
          encrypted_token: string;
          scopes: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["github_connections"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["github_connections"]["Insert"]>;
      };
      publish_jobs: {
        Row: {
          id: string;
          user_id: string;
          project_id: string;
          provider: string;
          status: string;
          repository_url: string | null;
          deployment_url: string | null;
          provider_project_id: string | null;
          commit_sha: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["publish_jobs"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["publish_jobs"]["Insert"]>;
      };
      deployment_configs: {
        Row: {
          id: string;
          project_id: string;
          provider: string;
          repository_name: string;
          branch: string;
          framework: string;
          build_command: string;
          output_directory: string;
          root_directory: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["deployment_configs"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["deployment_configs"]["Insert"]>;
      };
      deployment_env_vars: {
        Row: {
          id: string;
          project_id: string;
          provider: string;
          key: string;
          is_required: boolean;
          is_secret: boolean;
          configured: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["deployment_env_vars"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["deployment_env_vars"]["Insert"]>;
      };
    };
  };
}
