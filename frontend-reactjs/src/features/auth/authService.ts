import type {
  LoginResponse,
  RegisterLogoutResponse,
  UserDto,
} from "./auth.types";
import { api } from "../../api/axiosInstance";

export class AuthService {
  static async register(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<RegisterLogoutResponse> {
    const response = await api.post<RegisterLogoutResponse>("/auth/register", {
      email,
      password,
      name,
      surname,
    });
    return response.data;
  }

  static async login(email: string, password: string) {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  static async getCurrentUser(): Promise<UserDto | null> {
    const response = await api.get<UserDto>("/auth/currentUser");
    return response.data;
  }

  static async logout(): Promise<RegisterLogoutResponse> {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
}
