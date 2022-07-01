import { Router } from "express";

import { postTransaction } from "../controllers/transactionsController.js";
import { validateToken } from "../middlewares/tokenValidationMiddleware.js";
import { validateTransaction } from "../middlewares/transactionValidationMiddleware.js";

export const transactionsRoute = Router();

transactionsRoute.post(
  "/transactions",
  validateToken,
  validateTransaction,
  postTransaction
);
