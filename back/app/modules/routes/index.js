import express from "express";
import authRoutes from "./authRoutes.js";
import messageRoutes from "./messageRoutes.js";
import userRoutes from "./userRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import gamesRoutes from "./gamesRoutes.js";
import rentingGamesRoutes from "./rentingGamesRoutes.js";
import rentingRoutes from "./rentsRoutes.js";
import {config} from "../../config/app.config.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/user/account/message", messageRoutes);
router.use("/api/upload", uploadRoutes);
router.use("/api/", gamesRoutes);
router.use("/api/", rentingGamesRoutes);
router.use("/api/", rentingRoutes);


export function setupRoutes(app) {
  app.use("/uploads", express.static(config.uploads));
  app.use(router);
}
export default router;
