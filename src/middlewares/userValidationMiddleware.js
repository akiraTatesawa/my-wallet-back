// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";
import { compareSync } from "bcrypt";
import chalk from "chalk";

import { db } from "../database.js";
import { loginUserSchema, userSchema } from "../schemas/userSchema.js";

export async function validateLogin(req, res, next) {
  const { error } = loginUserSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  const user = {
    ...req.body,
    email: req.body.email.trim(),
  };

  try {
    const registeredUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (!registeredUser) {
      console.log(chalk.red("User not found"));
      return res.sendStatus(404);
    }

    if (!compareSync(user.password, registeredUser.password)) {
      console.log(chalk.red("User or password invalid"));
      return res.sendStatus(401);
    }

    res.locals.registeredUser = registeredUser;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  return next();
}

export async function validateSignUp(req, res, next) {
  const { error } = userSchema.validate(req.body);

  if (error || stripHtml(req.body.name).result.trim().length === 0) {
    console.log(error?.details || "Blank name");
    return res.sendStatus(422);
  }

  const newUser = {
    ...req.body,
    name: stripHtml(req.body.name).result.trim(),
    email: req.body.email.trim(),
    password: req.body.password,
  };

  try {
    const isEmailInUse = await db
      .collection("users")
      .findOne({ email: newUser.email });

    if (isEmailInUse) {
      console.log(chalk.red("\nThis email is already being used"));
      return res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  res.locals.newUser = newUser;
  return next();
}
