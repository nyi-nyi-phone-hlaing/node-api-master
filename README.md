# @codenokami/node-api-master 🚀

A professional, lightweight, and "all-in-one" utility package for **Express.js** APIs. It provides standardized error handling, advanced authentication helpers, a built-in time library, and security middlewares.

## ✨ Features

- 🛠 **The `cnk` Namespace**: Access all tools via a single, organized object.
- 🕒 **CNK Time**: A zero-dependency, timezone-aware date/time library (Moment/DayJS alternative).
- 🌈 **Advanced Logger**: Colorized console logs with device detection and response time.
- 🔐 **Auth Helpers**: JWT with auto-cookie injection & Bcrypt hashing.
- 🛡️ **Security Suite**: Built-in Rate Limiter, Security Headers, and Body Trimmer.
- 🚥 **Error Handling**: Global middleware and async wrapper (no more try-catch).
- 🔌 **Socket.io Singleton**: Manage socket instances globally.

---

## 📦 Installation

```bash
npm install @codenokami/node-api-master

```

---

## 📖 The `cnk` Namespace Guide

Everything you need is organized under the `cnk` object for better code readability.

### 1. CNK Time (Date Manipulation)

Powerful, chainable date utilities with timezone support and AM/PM formatting.

```javascript
import { cnk } from "@codenokami/node-api-master";

// Basic Formatting
cnk.time().format("DD/MM/YYYY HH:mm A"); // "11/02/2026 07:46 PM"

// Timezone Support
cnk.time("America/New_York").format("HH:mm a"); // "09:16 am"

// Method Chaining
const nextMonthStart = cnk.time().next(30).startOfMonth().format("YYYY-MM-DD");

// Relative Time
cnk.time("Asia/Yangon", "2026-02-11T10:00:00Z").ago(); // "9 hours ago"
```

---

### 2. Middlewares & Security

#### **Origin Logger & Security Headers**

```javascript
const app = express();

app.use(cnk.header()); // Set security headers (XSS, Clickjacking protection)
app.use(cnk.origin()); // Colorized logs: Date [Device] Origin Route Method Status Time
app.use(cnk.trimmer()); // Automatically trim() all string values in req.body
```

#### **Rate Limiter (Memory-Safe)**

Protects your API from Brute Force and DDoS attacks with automatic memory cleanup.

```javascript
app.use(
  cnk.limiter({
    max: 100, // limit each IP to 100 requests
    windowMs: 15 * 60 * 1000, // per 15 minutes
  }),
);
```

---

### 3. Core Utilities

#### **Authentication & JWT**

`cnk.auth.generateToken(payload, res, options)` - Generates JWT and injects HttpOnly Cookie.

```javascript
const login = async (req, res) => {
  const token = cnk.auth.generateToken({ id: user._id }, res, {
    expiresIn: "7d",
    cookieName: "session",
  });
};
```

#### **Pagination Helper**

```javascript
const pagination = cnk.paginate(totalItems, currentPage, limit);
// Returns: { totalItems, totalPages, currentPage, limit, hasNextPage, hasPrevPage }
```

---

### 4. Global Error Handling

Standardize your error responses across the entire application.

```javascript
import {
  errorMiddleware,
  catchAsync,
  AppError,
} from "@codenokami/node-api-master";

// Wrap async functions
const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.json(user);
});

// App level error handler
app.use(errorMiddleware);
```

---

## 🛠 Configuration (.env)

Package စနစ်တကျ အလုပ်လုပ်ရန် အောက်ပါ Environment Variables များ လိုအပ်ပါသည်။

```env
NODE_ENV=development
JWT_SECRET=your_super_secret_key
PORT=5000

```

> **Security Note:** Production တွင် `NODE_ENV=production` ဟု သတ်မှတ်ပေးပါ။ ထိုအခါမှသာ Cookie များသည် `Secure` ဖြစ်မည်ဖြစ်ပြီး Logger သည် Production mode သို့ ပြောင်းလဲမည်ဖြစ်သည်။

---

## 📜 HTTP Status Codes Reference

Use `cnk.helper.status` for better readability:

- OK: 200
- CREATED: 201
- ACCEPTED: 202
- NO_CONTENT: 204
-
- MOVED_PERMANENTLY: 301
- FOUND: 302

- BAD_REQUEST: 400
- UNAUTHORIZED: 401
- FORBIDDEN: 403
- NOT_FOUND: 404
- METHOD_NOT_ALLOWED: 405
- CONFLICT: 409
- UNPROCESSABLE_ENTITY: 422
- TOO_MANY_REQUESTS: 429

- INTERNAL_SERVER_ERROR: 500
- NOT_IMPLEMENTED: 501
- BAD_GATEWAY: 502
- SERVICE_UNAVAILABLE: 503,
- GATEWAY_TIMEOUT: 504

---

## 👤 Author

**CNK (CodeNoKami)**

## 📄 License

This project is licensed under the MIT License.
