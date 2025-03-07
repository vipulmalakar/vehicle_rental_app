import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ENV } from "./env";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: ENV.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  ssl: {
    rejectUnauthorized: false,
  },
});