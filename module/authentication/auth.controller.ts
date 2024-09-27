import { Request, Response, NextFunction } from "express";
import User from "../authentication/user.model";
import {
  handleForgotPassword,
  resetPasswordService,
} from "../authentication/auth.service";
import { isEmpty } from "../utils/obj.isEmpty";

import {
  FORGOT_PASSWORD_MODEL,
  RESET_PASSWORD_MODEL,
} from "../authentication/user.model";
import AppError from "../utils/error";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    const token = signToken(user.id.toString());

    return res.status(201).json({ status: "success", token, data: { user } });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ status: "fail", message: err.message });
  }
};
const JWT_SECRET = "login";

// Helper function to generate a JWT token
const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.correctPassword(password))) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid email or password" });
    }

    const token = signToken(user.id.toLocaleString()); // Assuming you will create a JWT token instead of using user id directly
    return res.status(200).json({ status: "success", token });
  } catch (err: any) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (isEmpty(req.body)) {
    return next(new AppError("form data not found", 400));
  }

  try {
    const { error } = FORGOT_PASSWORD_MODEL.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const email = req.body.email;
    const result = await handleForgotPassword(email);

    res.json({ message: result });
  } catch (err) {
    return next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, OTP, password, confirmPassword } = req.body;

  if (isEmpty(req.body)) {
    return next(new AppError("form data not found", 400));
  }

  try {
    const { error } = RESET_PASSWORD_MODEL.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    if (password !== confirmPassword) {
      return next(new AppError("Passwords are not equal", 400));
    }

    const message = await resetPasswordService(email, OTP, password);

    res.json({ data: message });
  } catch (err: any) {
    return next(new AppError(err.message || "Error resetting password", 500));
  }
};
