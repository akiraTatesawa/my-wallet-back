import { Router } from "express";

import {
  deleteTransaction,
  getTransactions,
  postTransaction,
} from "../controllers/transactionsController.js";

import { validateToken } from "../middlewares/tokenValidationMiddleware.js";
import {
  validateTransaction,
  validateTransactionId,
} from "../middlewares/transactionValidationMiddleware.js";

export const transactionsRoute = Router();

transactionsRoute.post(
  "/transactions",
  validateToken,
  validateTransaction,
  postTransaction
);
transactionsRoute.get("/transactions", validateToken, getTransactions);

transactionsRoute.delete(
  "/transactions/:idTransaction",
  validateToken,
  validateTransactionId,
  deleteTransaction
);
