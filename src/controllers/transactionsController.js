import chalk from "chalk";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import { db } from "../database.js";

export async function postTransaction(_req, res) {
  const { session, transaction } = res.locals;

  try {
    const newTransaction = {
      id: new ObjectId(),
      ...transaction,
      date: dayjs().format("DD/MM"),
    };

    const filter = { userId: session.userId };

    const userTransactions = await db
      .collection("transactions")
      .findOne(filter);

    const updatedTransactionsHistory = {
      $set: {
        transactionsHistory: [
          ...userTransactions.transactionsHistory,
          newTransaction,
        ],
      },
    };

    await db
      .collection("transactions")
      .updateOne(filter, updatedTransactionsHistory);

    console.log(chalk.green("\nTransaction successfully registered"));
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getTransactions(_req, res) {
  const { session } = res.locals;

  try {
    const userTransactions = await db
      .collection("transactions")
      .findOne({ userId: session.userId });

    return res.status(200).send(userTransactions.transactionsHistory);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteTransaction(_req, res) {
  const { session, idTransaction } = res.locals;

  try {
    const deleted = await db.collection("transactions").updateOne(
      { userId: session.userId },
      {
        $pull: {
          transactionsHistory: { id: new ObjectId(idTransaction) },
        },
      }
    );

    if (deleted.modifiedCount === 0) {
      return res.status(404).send("Transaction not found");
    }

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
