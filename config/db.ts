import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

// Use environment variables instead of hardcoded values for sensitive data
const DB_NAME = process.env.DB_NAME || "library_management";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "Srilekha@11*";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_DIALECT: any = process.env.DB_DIALECT || "postgres"; // Use "any" for dialect typing

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

console.log("process.env working");

// Authenticate and check database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err: Error) => console.log("Error: " + err.message));

export default sequelize;
