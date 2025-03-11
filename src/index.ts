import cors from "cors";
import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';

import { KafkaServer, appPort } from "../config/config";
import { kafkaConsumer } from "./kafkaConsumer";

const app = express();

app.use(express.static(path.resolve(__dirname, "build")));
app.use(express.json());
app.use(
  cors({
    origin: KafkaServer,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(cookieParser());

(async () => {
    app.listen(appPort, () => {
      console.log(`Listening port ${appPort}`);
    });
    await kafkaConsumer.startConsumer();
  })();