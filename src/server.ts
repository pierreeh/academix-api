import "dotenv/config";
import express from "express";
import cors from "cors";
import { xss } from "express-xss-sanitizer";
import cookieParser from "cookie-parser";

import requestLogger from "./middlewares/requestLogger.middleware";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default function server() {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());
  app.use(cookieParser());

  app.use(requestLogger);

  console.log("hello world");
  return app;
}
