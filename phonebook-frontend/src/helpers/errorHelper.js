import { isAxiosError } from "axios";

export function handleError(error) {
  console.error(error);

  let message;

  if (isAxiosError(error) && error.response) {
    const errorPayload = error.response.data;

    message = errorPayload.error;
  } else {
    message = "An error has occurred";
  }

  return { message };
}
