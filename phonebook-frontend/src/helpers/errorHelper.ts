import { isAxiosError } from "axios";

interface ErrorPayload {
  error: string;
}

interface ErrorHandlerResults {
  message: string;
}

export function handleError(error: unknown): ErrorHandlerResults {
  console.error(error);

  let message;

  if (isAxiosError(error) && error.response) {
    const errorPayload = error.response.data as ErrorPayload;

    message = errorPayload.error;
  } else {
    message = "An error has occurred";
  }

  return { message };
}
