import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { httpLogger } from "./config/logger";

const app = express();
app.use(cors());
app.use(express.json());

app.use(httpLogger);

app.use(globalErrorHandler);

export default app;