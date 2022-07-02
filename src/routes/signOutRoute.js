import { Router } from "express";
import { signOut } from "../controllers/authController.js";

import { validateToken } from "../middlewares/tokenValidationMiddleware.js";

export const signOutRoute = Router();

signOutRoute.delete("/sign-out", validateToken, signOut);
