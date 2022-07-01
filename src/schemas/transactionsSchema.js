import joi from "joi";

export const transactionSchema = joi.object({
  description: joi.string().min(1).required(),
  type: joi.string().valid("expense", "income").required(),
  value: joi
    .string()
    .min(1)
    .required()
    .pattern(/^\$?([0-9]{1,3}\.([0-9]{3}\.)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/),
});
