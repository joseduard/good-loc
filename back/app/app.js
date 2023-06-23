import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { errorHandler } from "./utils/helpers/errorHandler.js";
import { config } from "./config/app.config.js";
import { globalRateLimiter } from "./utils/middlewares/rate-limit/setGlobalRateLimit.js";
import { setupRoutes } from "./modules/routes/index.js";

function setupMiddlewares(app) {
  app.use(globalRateLimiter);
  app.use(cors(config.corsOptions));
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

function setupErrorHandlers(app) {
  app.use(errorHandler);
}

function createApp() {
  const app = express();

  setupMiddlewares(app);
  setupRoutes(app);
  setupErrorHandlers(app);

  return app;
}

export default createApp();
