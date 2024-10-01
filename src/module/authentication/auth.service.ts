import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import AppError from "../../../src/module/utils/error";
import User from "../../../src/module/authentication/user.model";
import bcrypt from "bcryptjs";
import BadRequestError from "../../../src/module/errors/api-errors/BadRequesterror";

dotenv.config();
const JWT_SECRET = "login";
export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};
// Sign a JWT token
export const signToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  if (!expiresIn) {
    throw new Error("JWT_EXPIRES_IN is not defined in environment variables.");
  }

  return jwt.sign({ id }, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired token.");
  }
};

// Handle password reset request
export const handleForgotPassword = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError("User does not exist", 400);
    }

    const OTP = Math.floor(1000 + Math.random() * 9000);
    const OtpVerified = new Date();
    OtpVerified.setMinutes(OtpVerified.getMinutes() + 10);

    //const OtpExpiresAt = new Date();
    //OtpExpiresAt.setMinutes(OtpExpiresAt.getMinutes() + 10);

    await User.update({ OTP: OTP, OtpVerified: false }, { where: { email } });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "saycute735@gmail.com", // Update with a more secure approach
        pass: "evlm jrac wuzt qxaq", // Avoid hardcoding sensitive information
      },
    });

    const mailOptions = {
      from: "saycute735@gmail.com",
      to: email,
      subject: "Password reset OTP",
      text: `Your OTP (valid for 10 minutes): ${OTP}`,
    };

    await transporter.sendMail(mailOptions);
    return "OTP sent to your email";
  } catch (error) {
    console.error(error);
    throw new AppError("Error handling forgot password", 500);
  }
};

export const resetPasswordService = async (
  email: string,
  OTP: number,
  password: string
) => {
  try {
    console.log("Resetting password for:", email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error(`User with email ${email} not found`);
      throw new BadRequestError("User not found");
    }
    console.log("User found:", user);
    console.log("Checking OTP:", user.OTP, "provided OTP:", OTP);
    if (user.OTP !== OTP) {
      console.error("Invalid OTP provided");
      throw new BadRequestError("Invalid OTP");
    }
    console.log("Generating salt for password hashing");
    const salt = await bcrypt.genSalt(10);
    console.log("Salt generated:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password successfully hashed");
    await User.update(
      {
        password: hashedPassword,
        OTP: null,
        OtpVerified: true,
      },
      { where: { email } }
    );

    return "Password reset successful";
  } catch (err) {
    throw new AppError("Error resetting password", 500);
  }
};
