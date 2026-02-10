import Joi from "joi";

/**
 * User Validation Schemas
 */
const userSchema = {
  // Standard Register Schema
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.min": "Username must be at least 3 characters long",
      "any.required": "Username is a required field",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.email": "Please provide a valid email address",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters long",
    }),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords do not match" }),
    role: Joi.string().valid("user", "admin").default("user"),
  }),

  // Login Schema
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Password Update Schema
  updatePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),

  /**
   * စိတ်ကြိုက် schema အသစ်ဆောက်ချင်ရင် သုံးရန် (Dynamic Flexibility)
   * @param {Object} schemaDefinition - Joi object definition
   */
  custom: (schemaDefinition) => Joi.object(schemaDefinition),
};

export default userSchema;
