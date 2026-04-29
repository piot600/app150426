import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { AuthService } from "../authService";
import type { LoginResponse, UserDto } from "../auth.types";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  async function login(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const response = await AuthService.login(email, password);
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    setUser(response.user);
    return response;
  }

  async function logout(): Promise<void> {
    try {
      const response = await AuthService.logout();
      alert(response.message);
    } finally {
      setUser(null);
      navigate("/login");
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
