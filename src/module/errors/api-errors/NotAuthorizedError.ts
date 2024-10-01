import { CustomApiError } from "../api-errors/CustomApiError";

export class NotAuthorizedError extends CustomApiError {
  public statusCode = 401; // Explicitly define the statusCode property

  constructor(message: string) {
    super(message); // Call the parent constructor with the message
  }
}
