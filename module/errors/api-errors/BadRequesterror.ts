import { CustomApiError } from "./CustomApiError";

export default class BadRequestError extends CustomApiError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400; // Set the status code to 400
  }
}
