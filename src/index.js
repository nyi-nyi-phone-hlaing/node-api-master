// Database Connection
import connectDB from "./db/connection.js";

// Middlewares
import { auth, admin } from "./middleware/auth.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import originLogger from "./middleware/originLogger.js";
import trimmer from "./middleware/trimmer.js";
import limiter from "./middleware/limiter.js";
import headers from "./middleware/headers.js";

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
import paginate from "./utils/paginate.js";
import health from "./utils/health.js";
import time from "./utils/time.js";

/**
 * 🛠 CNK Master Object
 * All new features and organized utilities
 */
export const cnk = {
  // 🕒 Time Utility (Chainable & Timezone support)
  time,

  // 🛡️ Middlewares
  origin: originLogger, // Advanced colorized logger
  trimmer: trimmer, // Auto-trim request body
  limiter: limiter, // Memory-safe rate limiter
  header: headers, // Security headers (Helmet lite)

  // 🛠 Helpers & Tools
  health: health, // API Health check helper
  paginate: paginate, // Standardized pagination
  uuid: generateUUID, // Unique ID generator
  status: STATUS_CODES, // HTTP Status codes

  // 🔐 Auth Namespace (Organized access)
  auth: {
    hash: hashPassword,
    compare: comparePassword,
    generateToken: generateToken,
    shield: auth, // Alias for auth middleware
    admin: admin, // Admin middleware
  },

  // 📨 Response Namespace
  helper: {
    response: apiResponse,
    catch: catchAsync,
    DefineError: AppError,
  },
};

/**
 * 📦 Legacy & Named Exports
 * Keep existing codebase compatible
 */
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
  // New features also available as named exports
  originLogger,
  trimmer,
  limiter,
  headers as securityHeaders,
  paginate,
  health,
  time as cnkTime,
};
