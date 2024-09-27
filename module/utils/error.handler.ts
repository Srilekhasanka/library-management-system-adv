import { Request, Response, NextFunction } from "express";

class ErrorHandler {
  public errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
}

export default new ErrorHandler();
