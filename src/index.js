import "./config.js";
import express from "express";
import cors from "cors";
import chalk from "chalk";

import { signUpRoute } from "./routes/signUpRoute.js";
import { signInRoute } from "./routes/signInRoute.js";
import { transactionsRoute } from "./routes/transactionsRoute.js";
import { signOutRoute } from "./routes/signOutRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(signUpRoute);
app.use(signInRoute);
app.use(transactionsRoute);
app.use(signOutRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    chalk.bgGreen.black.bold(
      `\nServer running on port ${process.env.PORT || "5000"}...`
    )
  );
});
