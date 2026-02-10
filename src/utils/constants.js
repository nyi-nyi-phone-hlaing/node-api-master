/**
 * Standard HTTP Status Codes
 */
const PORT = process.env.PORT || 5000;

const STATUS_CODES = {
  // --- 2xx Success ---
  OK: 200, // Request အောင်မြင်သည်
  CREATED: 201, // Data အသစ် တည်ဆောက်မှု အောင်မြင်သည်
  ACCEPTED: 202, // လက်ခံရရှိသည် (နောက်မှ အလုပ်လုပ်မည်)
  NO_CONTENT: 204, // အောင်မြင်သည်၊ သို့သော် ပြစရာ Data မရှိ (ဥပမာ- Delete လုပ်ပြီးချိန်)

  // --- 3xx Redirection ---
  MOVED_PERMANENTLY: 301,
  FOUND: 302,

  // --- 4xx Client Errors ---
  BAD_REQUEST: 400, // ပေးပို့လိုက်သော Data Format မှားနေသည် (Validation error)
  UNAUTHORIZED: 401, // Login ဝင်ရန် လိုအပ်သည် (သို့မဟုတ် Token မှားသည်)
  FORBIDDEN: 403, // လုပ်ပိုင်ခွင့်မရှိ (ဥပမာ- Admin မဟုတ်ဘဲ Admin panel ဝင်ခြင်း)
  NOT_FOUND: 404, // ရှာဖွေနေသော Resource မရှိပါ
  METHOD_NOT_ALLOWED: 405, // API Method (GET, POST, etc.) မှားနေသည်
  CONFLICT: 409, // Data ထပ်နေသည် (ဥပမာ- ရှိပြီးသား Email နဲ့ Register လုပ်ခြင်း)
  UNPROCESSABLE_ENTITY: 422, // Validation Error များအတွက် အသုံးများသည်
  TOO_MANY_REQUESTS: 429, // API ကို ခဏခဏ ဆက်တိုက်ခေါ်ခြင်း (Rate limiting)

  // --- 5xx Server Errors ---
  INTERNAL_SERVER_ERROR: 500, // Server ထဲတွင် Code မှားယွင်းခြင်း
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503, // Server ခေတ္တပိတ်ထားသည်
  GATEWAY_TIMEOUT: 504,

  PORT,
};

export default STATUS_CODES;
