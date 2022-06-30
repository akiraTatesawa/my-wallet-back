import { Router } from "express";
// eslint-disable-next-line import/no-unresolved
import { postSignUp } from "../controllers/signUpController.js";

export const signUpRoute = Router();

signUpRoute.post("/sign-up", postSignUp);
