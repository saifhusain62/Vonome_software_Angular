export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}