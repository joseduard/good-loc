import { Router } from "express";
import {
  getAllGames,
  getGamesByName,
  getGameById,
} from "../controllers/gamesController.js";
import { isValidJwt } from "../../utils/middlewares/auth/verifJwt.js";

const router = Router();

router.get("/games", isValidJwt, getAllGames);
router.get("/gamesByName/:name", isValidJwt, getGamesByName);
router.get("/game/:id", isValidJwt, getGameById);

export default router;
