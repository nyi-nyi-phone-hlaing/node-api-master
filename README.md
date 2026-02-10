# @cnk/node-api-master 🚀

A robust, professional-grade utility package for Express.js APIs. This package simplifies database connections, authentication, real-time communication with Socket.io, error handling, and request validation.

---

## 📦 Installation

This package is designed to work with **mongoose** and **socket.io** as peer dependencies to avoid version conflicts.

```bash
# Install the core package
npm install @cnk/node-api-master

# Install required peer dependencies
npm install mongoose socket.io

```

---

## 📂 Features

- **🛡 Auth & Admin Middleware**: JWT-based route protection and role-based access control.
- **🔌 Socket.io Helper**: Integrated real-time communication with JWT authentication support.
- **🚨 Global Error Handler**: Centralized error management using the `AppError` class.
- **⚡ CatchAsync Utility**: Eliminate repetitive `try-catch` blocks in your controllers.
- **✅ Joi Validation**: Pre-defined and custom schemas for request validation.
- **🔗 DB Helper**: Simplified MongoDB connection setup.
- **📊 Standardized Responses**: Uniform success and error API response formats.

---

## 📖 Detailed Usage Guide

### 1. Database Connection & Server Setup

Handle dynamic ports and database connections efficiently.

```javascript
const { connectDB, STATUS_CODES } = require("@cnk/node-api-master");

// Start DB
connectDB(process.env.MONGO_URI);

// Dynamic Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### 2. Socket.io with Authentication

Setup a secure real-time server. The middleware automatically verifies tokens from `socket.handshake.auth.token`.

```javascript
const http = require("http");
const { socket } = require("@cnk/node-api-master");

const server = http.createServer(app);

// Initialize Socket with JWT protection
const io = socket.initSocket(server, {
  authRequired: true,
  jwtSecret: process.env.JWT_SECRET,
});

io.on("connection", (s) => {
  console.log("Authenticated User ID:", s.user.id);
});

server.listen(PORT);
```

---

### 3. Authentication Middleware (HTTP)

Protect your Express routes using JWT.

```javascript
const { auth, admin } = require("@cnk/node-api-master");

// Protect a route
router.get("/me", auth(), userController.getMe);

// Admin only route
router.delete("/users/:id", auth(), admin, userController.deleteUser);
```

---

### 4. Request Validation (Joi)

Validate incoming request bodies, params, or queries.

```javascript
const { validate, schemas, Joi } = require("@cnk/node-api-master");

// Use pre-built schemas
router.post("/login", validate(schemas.user.login), authController.login);

// Use custom schema
const profileSchema = Joi.object({
  bio: Joi.string().max(200),
  website: Joi.string().uri(),
});
router.put("/profile", validate(profileSchema), userController.updateProfile);
```

---

### 5. Standardized Responses & Error Handling

Keep your API responses consistent across the entire project.

```javascript
const {
  catchAsync,
  AppError,
  apiResponse,
  STATUS_CODES,
} = require("@cnk/node-api-master");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found!", STATUS_CODES.NOT_FOUND));
  }

  apiResponse.success(res, user, "User retrieved successfully");
});
```

---

### 6. Global Error Middleware

**Mandatory:** Register this at the very end of your middleware stack in `app.js`.

```javascript
const { errorMiddleware } = require("@cnk/node-api-master");

// After all your routes
app.use(errorMiddleware);
```

---

## 🛠 Project Structure

- `src/db`: Mongoose connection helpers.
- `src/middleware`: Auth, Admin, Validation, and Global Error handlers.
- `src/socket`: Socket.io initialization and JWT middleware.
- `src/utils`: `AppError`, `catchAsync`, and API response helpers.
- `src/validations`: Reusable Joi schemas.

---

## 📄 License

MIT © CNK
