import { api } from "../../api/axiosInstance";

export type ProfileInfoResponse = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  name: string;
  surname: string;
};

export type UserListRow = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  name: string;
  surname: string;
};

export class UserService {
  static async getProfile(): Promise<ProfileInfoResponse | null> {
    const response = await api.get<ProfileInfoResponse>("/user/profile");
    return response.data;
  }

  static async getAllUsers() {
    const response = await api.get<UserListRow[]>("/user/all");
    return response.data;
  }
}
