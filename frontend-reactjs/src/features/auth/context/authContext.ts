import { createContext } from "react";
import type { LoginResponse, UserDto } from "../auth.types";

export type authContextType = {
  user: UserDto | null;
  setUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<authContextType | null>(null);
