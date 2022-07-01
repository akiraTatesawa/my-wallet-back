import { Router } from "express";

import {
  getTransactions,
  postTransaction,
} from "../controllers/transactionsController.js";

import { validateToken } from "../middlewares/tokenValidationMiddleware.js";
import { validateTransaction } from "../middlewares/transactionValidationMiddleware.js";

export const transactionsRoute = Router();

transactionsRoute.post(
  "/transactions",
  validateToken,
  validateTransaction,
  postTransaction
);
transactionsRoute.get("/transactions", validateToken, getTransactions);
