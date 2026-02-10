import STATUS_CODES from "./constants.js";

/**
 * Standard API Response Wrapper
 */
const apiResponse = {
  // အောင်မြင်တဲ့ response ပေးပို့ရန်
  success: (res, data, message = "Success", statusCode = STATUS_CODES.OK) => {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  },

  // Error response ပေးပို့ရန် (Operational error များအတွက်)
  error: (
    res,
    message = "Internal Server Error",
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
  ) => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  },
};

export default apiResponse;
