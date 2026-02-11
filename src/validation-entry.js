import Joi from "joi";
import validate from "./middleware/validate.js";
import schemas from "./validations/index.js";

// အသုံးပြုသူက Joi ရော၊ validate middleware ရော၊ schemas တွေကိုပါ တစ်နေရာတည်းက ရစေမယ်
export { Joi, validate, schemas };

// Default export အနေနဲ့ schemas ကို ပေးထားလိုက်မယ်
export default schemas;
