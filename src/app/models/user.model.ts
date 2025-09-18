export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'Gold' | 'Silver' | 'Bronze' | 'Basic';
  miles: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}
