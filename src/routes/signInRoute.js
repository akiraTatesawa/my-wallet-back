import { Router } from "express";

import { postSignIn } from "../controllers/signInController.js";

export const signInRoute = Router();

signInRoute.post("/sign-in", postSignIn);
