import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../../../src/module/authentication/auth.controller";

const router = express.Router();

// Define routes with appropriate method types
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
