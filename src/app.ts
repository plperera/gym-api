import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";
import { authRouter } from "./routers/auth-router";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/auth", authRouter)
  .get("/health", (_req, res) => res.send("OK!"))

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
