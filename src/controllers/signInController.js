import { compareSync } from "bcrypt";
import chalk from "chalk";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

import { db } from "../database.js";
import { loginUserSchema } from "../schemas/userSchema.js";

export async function postSignIn(req, res) {
  const user = {
    ...req.body,
    email: req.body.email.trim(),
  };

  const { error } = loginUserSchema.validate(user);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

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

    const token = uuid();
    const userId = new ObjectId(registeredUser._id);

    await db.collection("sessions").insertOne({ userId, token });

    const responseData = {
      userId,
      token,
      name: registeredUser.name,
    };

    return res.status(200).send(responseData);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
