export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  field?: string;
  degree?: string;
  skills?: string[];
  isDemoUser?: boolean;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isDemoMode: boolean;
}
