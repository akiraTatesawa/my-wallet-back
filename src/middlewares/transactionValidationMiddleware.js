// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";
import { transactionSchema } from "../schemas/transactionsSchema.js";

export function validateTransaction(req, res, next) {
  const { error } = transactionSchema.validate(req.body);

  const { value } = req.body;

  if (
    error ||
    value.includes(".") ||
    parseFloat(value.replace(",", "")) === 0 ||
    stripHtml(req.body.description).result.trim().length === 0
  ) {
    return res.sendStatus(422);
  }

  const formatedValue = parseFloat(req.body.value.replace(",", "."))
    .toFixed(2)
    .replace(".", ",");

  const transaction = {
    ...req.body,
    value: formatedValue,
    description: stripHtml(req.body.description).result.trim(),
  };

  res.locals.transaction = transaction;
  return next();
}
