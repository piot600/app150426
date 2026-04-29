import axios, { AxiosError } from "axios";
import type { RefreshResponse, RetryConfig } from "./axiosInstance.types";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return Promise.reject(error);
    }

    try {
      const response = await axios.post<RefreshResponse>(
        "http://localhost:3000/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return Promise.reject(refreshError);
    }
  },
);

//wersja jest poprawna i może działać, ale do production dodałbym kolejkę refreshowania
//i obsługę wylogowania / stanu usera po failu refreshu.Na razie możesz używać swojej
//wersji, a kolejkę dodać, gdy aplikacja zacznie mieć więcej requestów równolegle.

// 1. request leci ze starym / wygasłym accessTokenem
// 2. backend zwraca 401
// 3. axios interceptor robi /auth/refresh
// 4. zapisuje nowy accessToken
// 5. ponawia request
// 6. drugi request kończy się 200 OK
