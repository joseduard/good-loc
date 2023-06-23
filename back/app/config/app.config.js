// config.js
import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnv(); // load environment variables

export const config = {
  port: process.env.PORT || 8080,
  corsOptions: { origin: "http://localhost:3000" },
  uploads: path.join(__dirname, "uploads"),
};