import { CustomApiError } from "../api-errors/CustomApiError";

export class ValidationError extends CustomApiError {
  public statusCode = 400; // Corrected the status code to 400

  constructor(message: string) {
    super(message); // Call the parent constructor with the message
  }
}
