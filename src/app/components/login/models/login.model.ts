export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginContainerData {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
