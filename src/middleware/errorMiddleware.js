import STATUS_CODES from "../utils/constants.js";

/**
 * Global Error Handling Middleware
 */
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  // Development mode မှာ Error အပြည့်အစုံပြပြီး Production မှာ message ပဲ ပြမယ်
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production Mode
    // အကယ်၍ ဒါက ကျွန်တော်တို့ သတ်မှတ်ထားတဲ့ Operational Error (AppError) ဆိုရင်
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // မထင်မှတ်ထားတဲ့ Programming error တွေဖြစ်ရင် (ဥပမာ- Library တစ်ခုက တက်တဲ့ error)
      console.error("ERROR 💥", err);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};

export default errorMiddleware;
