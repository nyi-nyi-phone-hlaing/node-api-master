import Joi from "joi";

/**
 * Common Joi Schemas
 */
const commonSchema = {
  // MongoDB ObjectId စစ်ဆေးရန် (24 hex characters)
  objectId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "Invalid ID format. Must be a valid ObjectId.",
    }),

  // Pagination အတွက် (Query strings)
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().optional(),
    fields: Joi.string().optional(),
  }),
};

export default commonSchema;
