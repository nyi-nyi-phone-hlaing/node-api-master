import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Password ကို Hash လုပ်ရန်
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Password မှန်/မမှန် စစ်ဆေးရန်
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * JWT Token ထုတ်ပေးပြီး Cookie ထဲသို့ တန်းထည့်ပေးမည့် Helper
 * @param {Object} payload - Token ထဲတွင် သိမ်းလိုသော အချက်အလက် (e.g., { userId })
 * @param {Object} res - Express Response Object
 * @param {Object} options - စိတ်ကြိုက်ပြင်ဆင်နိုင်သော options များ
 */
export const generateToken = (payload, res, options = {}) => {
  const secret = options.secret || process.env.JWT_SECRET;
  const expiresIn = options.expiresIn || "30d";
  const cookieName = options.cookieName || "jwt";
  const isProduction = process.env.NODE_ENV === "production";

  // 1. Token Generate လုပ်ခြင်း
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });

  if (res && typeof res.cookie === "function") {
    // 2. Cookie Options သတ်မှတ်ခြင်း
    const cookieOptions = {
      maxAge: options.maxAge || 30 * 24 * 60 * 60 * 1000, // Default 30 days
      httpOnly: true, // JavaScript မှ ဖတ်မရအောင် (Prevent XSS)
      sameSite: isProduction ? "none" : "lax", // CSRF Protection
      secure: isProduction, // Production တွင် HTTPS သုံးမှသာ အလုပ်လုပ်မည်
      ...options.extraCookieOptions, // တခြား အပို options များရှိလျှင် ထည့်ရန်
    };

    // 3. Cookie ထဲသို့ ထည့်ခြင်း
    res.cookie(cookieName, token, cookieOptions);
  }

  return token;
};
