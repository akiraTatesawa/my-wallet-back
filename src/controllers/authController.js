import bcrypt from "bcrypt";
import chalk from "chalk";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

import { db } from "../database.js";

export async function postSignIn(_req, res) {
  const { registeredUser } = res.locals;

  try {
    const token = uuid();
    const userId = new ObjectId(registeredUser._id);

    const session = await db.collection("sessions").findOne({ userId });

    if (session) {
      const updatedSession = {
        $set: {
          token,
        },
      };
      await db.collection("sessions").updateOne({ userId }, updatedSession);
    } else {
      await db.collection("sessions").insertOne({ userId, token });
    }

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

export async function postSignUp(req, res) {
  const { newUser } = res.locals;

  try {
    const dbUser = await db.collection("users").insertOne({
      ...newUser,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    await db.collection("transactions").insertOne({
      userId: new ObjectId(dbUser.insertedId),
      username: newUser.name,
      transactionsHistory: [],
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
}
