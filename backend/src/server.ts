import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import app from "./app";
import { ENV } from "./config/env";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");

    app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();