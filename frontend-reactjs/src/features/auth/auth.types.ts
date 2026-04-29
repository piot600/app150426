export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
};

export type UserDto = {
  id: number;
  email: string;
  role: Role;
};

export type Role = "USER" | "ADMIN";

export type RegisterLogoutResponse = {
  message: string;
};
