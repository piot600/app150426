import type { InternalAxiosRequestConfig } from "axios";

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
