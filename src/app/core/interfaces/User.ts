export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface LoginModel {
  email: string;
  password: string;
  remember?: boolean;
}