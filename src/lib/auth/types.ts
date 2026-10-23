interface AuthUser {
  id: number;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  exp: string;
  user: AuthUser;
  status: string;
}

export type { AuthUser, AuthResponse };
