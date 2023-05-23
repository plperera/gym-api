require('module-alias/register');
import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";
import { authRouter } from "./routers/auth-router";
import { categoryRouter } from "./routers/category-router";
import { productRouter } from "./routers/product-router";

loadEnv();

const app = express();
app
  app.use(cors({
    origin: 'https://www.upsportbrasil.com.br',  // Altere isso para seu domínio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true  // Isso permite que cookies sejam enviados.
  }))
  .use(express.json())
  .use("/auth", authRouter)
  .use("/category", categoryRouter)
  .use("/product", productRouter)
  .get("/health", (_req, res) => res.send("OK!"))

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
