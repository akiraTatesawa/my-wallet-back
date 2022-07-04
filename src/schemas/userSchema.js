import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().required().min(1).max(15),
  email: joi.string().required().min(1),
  password: joi.string().required().min(1),
});

export const loginUserSchema = joi.object({
  email: joi.string().required().min(1),
  password: joi.string().required().min(1),
});
