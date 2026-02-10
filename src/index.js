// 1. External Libraries
import Joi from "joi";

// 2. Database Connection
import connectDB from "./db/connection.js";

// 3. Middlewares
import { auth, admin } from "./middleware/auth.js";
import validate from "./middleware/validate.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// 4. Utilities
import catchAsync from "./utils/catchAsync.js";
import AppError from "./utils/AppError.js";
import * as apiResponse from "./utils/response.js";
import STATUS_CODES from "./utils/constants.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "./utils/authHelper.js";
import generateUUID from "./utils/uuid.js";

// 5. Validations
import schemas from "./validations/index.js";

// 6. Socket.io
import * as socket from "./socket/index.js";

/**
 * Centralized Exports
 */
export {
  // Library
  Joi,

  // DB
  connectDB,

  // Middlewares
  auth,
  admin,
  validate,
  errorMiddleware,

  // Utils & Helpers
  catchAsync,
  AppError,
  apiResponse,
  STATUS_CODES,
  hashPassword,
  comparePassword,
  generateToken,
  generateUUID,

  // Validations
  schemas,

  // Socket.io
  socket,
};
