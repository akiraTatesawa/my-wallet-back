import { Router } from "express";
// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";

import chalk from "chalk";
import { db } from "../database.js";

import { userSchema } from "../schemas/userSchema.js";

export const signUpRoute = Router();

signUpRoute.post("/sign-up", async (req, res) => {
  const newUser = {
    ...req.body,
    name: stripHtml(req.body.name).result.trim(),
    email: req.body.email.trim(),
    password: req.body.password,
  };

  const { error } = userSchema.validate(newUser);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  try {
    const isEmailInUse = await db
      .collection("users")
      .findOne({ email: newUser.email });

    if (isEmailInUse) {
      console.log(chalk.red("This email is already being used"));
      return res.sendStatus(409);
    }

    await db.collection("users").insertOne({
      ...newUser,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    console.log(
      chalk.green(
        `User ${chalk.green.bold(newUser.name)} registered successfully`
      )
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
