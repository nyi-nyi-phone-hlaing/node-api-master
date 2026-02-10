/**
 * Custom Error Class for API Errors
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    // status က 4xx ဆိုရင် 'fail', 5xx ဆိုရင် 'error' လို့ သတ်မှတ်မယ်
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // ဒါက ကျွန်တော်တို့ကိုယ်တိုင် သတ်မှတ်လိုက်တဲ့ Error ဖြစ်ကြောင်း အမှတ်အသားပြုတာပါ
    this.isOperational = true;

    // Error ဘယ်နေရာမှာ ဖြစ်တယ်ဆိုတဲ့ stack trace ကို သိမ်းထားမယ်
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
