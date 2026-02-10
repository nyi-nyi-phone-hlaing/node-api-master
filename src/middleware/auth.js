import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Auth Middleware - Supports Bearer Token & Cookies
 * @param {string} secret - JWT Secret (Default is process.env.JWT_SECRET)
 */
export const auth = (secret = process.env.JWT_SECRET) =>
  catchAsync(async (req, res, next) => {
    let token;

    // 1) Header ကနေ Bearer Token ကို စစ်ဆေးခြင်း
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2) Cookie ကနေ Token ကို စစ်ဆေးခြင်း
    else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // Secret မရှိရင် Developer ကို သတိပေးဖို့ Error ပြမယ်
    if (!secret) {
      return next(
        new AppError("JWT Secret is not defined in environment variables", 500),
      );
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return next(
        new AppError("Invalid token or expired. Please log in again.", 401),
      );
    }
  });

/**
 * Admin Middleware
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(
      new AppError("You do not have permission to perform this action", 403),
    );
  }
};
