// Database Connection
import connectDB from "./db/connection.js";

// Middlewares
import { auth, admin } from "./middleware/auth.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// Utilities
import catchAsync from "./utils/catchAsync.js";
import AppError from "./utils/AppError.js";
import apiResponse from "./utils/response.js";
import STATUS_CODES from "./utils/constants.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "./utils/authHelper.js";
import generateUUID from "./utils/uuid.js";

export {
  connectDB,
  auth,
  admin,
  errorMiddleware,
  catchAsync,
  AppError,
  apiResponse,
  STATUS_CODES,
  hashPassword,
  comparePassword,
  generateToken,
  generateUUID,
};
