import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { signUpRoute } from "./routes/signUpRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(signUpRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.bgGreen.black.bold("Server running on port 5000..."));
});
