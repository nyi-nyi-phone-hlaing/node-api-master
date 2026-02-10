import AppError from "../utils/AppError.js";

/**
 * Joi Schema Validation Middleware
 * @param {Object} schema - Joi validation schema
 */
const validate = (schema) => (req, res, next) => {
  // body, query, params အားလုံးကို စစ်လို့ရအောင် req object တစ်ခုလုံးကို schema နဲ့ တိုက်စစ်မယ်
  const { error, value } = schema.validate(req.body, {
    abortEarly: false, // Error အားလုံးကို တစ်ခါတည်း ပြရန်
    allowUnknown: true, // Schema ထဲမပါတဲ့ field တွေပါလာရင် လက်ခံရန်
    stripUnknown: true, // Schema ထဲမပါတဲ့ field တွေကို ဖယ်ထုတ်ပစ်ရန်
  });

  if (error) {
    // Error message တွေကို စုစည်းပြီး format လုပ်မယ်
    const errorMessage = error.details
      .map((detail) => detail.message.replace(/"/g, ""))
      .join(", ");

    return next(new AppError(errorMessage, 400));
  }

  // စစ်ဆေးပြီးသား data (sanitized data) ကို req.body ထဲ ပြန်ထည့်မယ်
  req.body = value;
  next();
};

export default validate;
