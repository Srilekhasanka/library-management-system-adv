class AppError extends Error {
  public statusCode: number;
  public error: string;
  public isOperational: boolean;

  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
    this.error = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
