// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";
import { transactionSchema } from "../schemas/transactionsSchema.js";

export function validateTransaction(req, res, next) {
  // check if req.body follows the rules
  const { error } = transactionSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  const transaction = {
    ...req.body,
    description: stripHtml(req.body.description).result.trim(),
  };

  res.locals.transaction = transaction;
  return next();
}
