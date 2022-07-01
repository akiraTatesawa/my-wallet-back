import chalk from "chalk";

import { db } from "../database.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace(/Bearer /, "");

  if (!token) {
    console.log(chalk.red("\nMust send a token!"));
    return res.sendStatus(422);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      console.log(chalk.red("\nInvalid session"));
      return res.sendStatus(401);
    }

    res.locals.session = session;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  return next();
}
