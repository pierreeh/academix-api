import "dotenv/config";
import express from "express";

import requestLogger from "./middlewares/requestLogger.middleware";

export default function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(requestLogger);

  console.log("hello world");
  return app;
}
