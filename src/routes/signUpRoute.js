import { Router } from "express";

import { postSignUp } from "../controllers/authController.js";
import { validateSignUp } from "../middlewares/userValidationMiddleware.js";

export const signUpRoute = Router();

signUpRoute.post("/sign-up", validateSignUp, postSignUp);
