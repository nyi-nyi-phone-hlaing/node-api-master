# @codenokami/node-api-master 🚀

A modern, robust, and professional Node.js utility package for building scalable REST APIs. Built with **ES Modules** and **TypeScript Support**, providing dual-format (CJS & ESM) compatibility.

---

## ✨ Features

- 🛠 **Standard API Response**: Consistent success and error response wrappers.
- 🛡 **Global Error Handling**: Centralized error middleware with operational vs programming error detection.
- ⚡ **Async Handler**: Eliminate the need for messy `try-catch` blocks in controllers.
- 🧪 **Joi Validations**: Pre-defined schemas for users, object IDs, and pagination.
- 🔑 **Auth Helpers**: Robust password hashing and JWT management.
- 🆔 **Secure UUID**: RFC 4122 compliant UUID v4 generator.
- 🔌 **Socket.io Auth**: Middleware for securing your real-time connections.

---

## 📦 Installation

```bash
npm install @codenokami/node-api-master
```

---

## 🚀 Quick Start

### 1. Setup Global Error Middleware

In your main app file (e.g., `index.js` or `app.js`):

```javascript
import express from "express";
import { errorMiddleware } from "@codenokami/node-api-master";

const app = express();

// ... your routes ...

// Must be at the end of all routes
app.use(errorMiddleware);
```

### 2. Using catchAsync & apiResponse

Clean up your controllers easily:

```javascript
import { catchAsync, apiResponse, AppError } from "@codenokami/node-api-master";

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return apiResponse.success(res, user, "User retrieved successfully");
});
```

### 3. Validating Requests

Use pre-built Joi schemas:

```javascript
import { validate, schemas } from "@codenokami/node-api-master";

// Apply validation as middleware
router.post(
  "/register",
  validate(schemas.user.register),
  authController.register,
);
```

---

## 🛠 Utilities Reference

| Utility                                | Description                                                |
| -------------------------------------- | ---------------------------------------------------------- |
| `generateUUID()`                       | Returns a secure v4 UUID string.                           |
| `authHelper.hashPassword(pw)`          | Hashes password using bcrypt.                              |
| `authHelper.comparePassword(pw, hash)` | Compares plain text password with hash.                    |
| `STATUS_CODES`                         | Standard HTTP Status codes (OK: 200, NOT_FOUND: 404, etc.) |

---

## 🏗 Build Status

- **ES Modules (ESM)**: Supported (`.mjs`)
- **CommonJS (CJS)**: Supported (`.cjs`)
- **TypeScript**: Type definitions included (`.d.ts`)

## 📜 License

MIT © CodeNoKami
