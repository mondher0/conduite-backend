import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Instructor, Learner, Rating, User } from "../entities";

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [User, Instructor, Learner, Rating],
  migrations: ["src/migration/**/*.ts"],
});
