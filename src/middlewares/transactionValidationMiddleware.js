// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";
import { transactionSchema } from "../schemas/transactionsSchema.js";

export function validateTransaction(req, res, next) {
  const transaction = {
    ...req.body,
    description: stripHtml(req.body.description).result.trim(),
  };

  const { error } = transactionSchema.validate(transaction);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  res.locals.transaction = transaction;
  return next();
}
