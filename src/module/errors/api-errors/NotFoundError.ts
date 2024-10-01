import { CustomApiError } from "../api-errors/CustomApiError";

export class NotFoundError extends CustomApiError {
  public statusCode = 404; // Corrected the status code to 404

  constructor(message: string) {
    super(message); // Call the parent constructor with the message
  }
}
