// config.js
import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(path.join("/uploads"));
loadEnv(); // load environment variables


//setup origin array (accepted url that can hit the endpoints of the api)
const origin = ["http://localhost:3000","http://137.74.196.230:3000"];
if (process.env.CORS_ORIGIN) {
    origin.push(process.env.CORS_ORIGIN);
}
export const config = {
  port: process.env.PORT || 8080,
  corsOptions: { origin: origin },
  uploads: path.join(__dirname, "/uploads"),
};