import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().required().min(1),
  email: joi.string().required().min(1),
  password: joi.string().required().min(1),
});
