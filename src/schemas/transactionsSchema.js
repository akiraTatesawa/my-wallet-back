import joi from "joi";

export const transactionSchema = joi.object({
  description: joi.string().min(1).required(),
  type: joi.string().valid("expense", "income").required(),
  value: joi
    .string()
    .min(1)
    .required()
    .pattern(
      /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(\,[\d]{0,2})?|[1-9]{1}[\d]{0,}(\,[\d]{0,2})?|0(\,[\d]{0,2})?|(\,[\d]{1,2})?)$/
    ),
});
