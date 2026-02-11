const rateLimitMap = new Map();

/**
 * Advanced Limiter with Auto-Cleanup Logic
 */
const limiter =
  (options = { max: 100, windowMs: 15 * 60 * 1000 }) =>
  (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    // --- [Auto-Cleanup Logic] ---
    // Memory မပြည့်အောင် သက်တမ်းကုန်နေတဲ့ IP တွေကို ရှင်းထုတ်ခြင်း
    // ဝင်လာသမျှ Request တိုင်းမှာ မစစ်ဘဲ 10% Chance လောက်နဲ့ပဲ စစ်ရင် Performance ပိုကောင်းပါတယ်
    if (Math.random() < 0.1) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (now - value.lastRequest > options.windowMs) {
          rateLimitMap.delete(key);
        }
      }
    }
    // ----------------------------

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, lastRequest: now });
      return next();
    }

    const userData = rateLimitMap.get(ip);

    // windowMs ကျော်သွားရင် count ကို reset ချမယ်
    if (now - userData.lastRequest > options.windowMs) {
      userData.count = 1;
      userData.lastRequest = now;
      return next();
    }

    // သတ်မှတ်ထားတဲ့ အကြိမ်ရေ ပြည့်မပြည့် စစ်မယ်
    if (userData.count >= options.max) {
      return res.status(429).json({
        status: "fail",
        message: "Too many requests, please try again later.",
      });
    }

    userData.count++;
    next();
  };

export default limiter;
