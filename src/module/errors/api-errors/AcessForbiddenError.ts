import { CustomApiError } from "../api-errors/CustomApiError";

class AccessForbiddenError extends CustomApiError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403; // Set the status code to 403
  }
}

export { AccessForbiddenError };
