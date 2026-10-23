import type { AuthResponse } from "./types";

const authenticate = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const baseUrl = import.meta.env.VITE_FINANCE_API_URL ?? "";

  const response = await fetch(`${baseUrl}/api/v1/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "E-mail ou senha inválidos."
        : "Não foi possível realizar o login.",
    );
  }

  const data: AuthResponse = await response.json();

  if (data.status !== "ok" || !data.token || !data.user) {
    throw new Error("Resposta de autenticação inválida.");
  }

  return data;
};

export { authenticate };
