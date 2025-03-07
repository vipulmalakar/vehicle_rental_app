import express from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { httpLogger } from "./config/logger";

const app = express();
app.use(cors());
app.use(express.json());

app.use(httpLogger);

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(globalErrorHandler);

export default app;