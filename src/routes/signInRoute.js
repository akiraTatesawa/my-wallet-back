import { Router } from "express";

import { postSignIn } from "../controllers/authController.js";
import { validateLogin } from "../middlewares/userValidationMiddleware.js";

export const signInRoute = Router();

signInRoute.post("/sign-in", validateLogin, postSignIn);
