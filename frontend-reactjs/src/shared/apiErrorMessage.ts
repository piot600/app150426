import axios from "axios";
import type { ApiErrorResponse } from "./apiError.types";

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong",
): string[] {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.length > 0 ? message : [fallbackMessage];
    }

    return message ? [message] : [fallbackMessage];
  }

  if (error instanceof Error) {
    return [error.message];
  }

  return [fallbackMessage];
}
