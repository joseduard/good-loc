import { Router } from "express";

import { isValidJwt } from "../../utils/middlewares/auth/verifJwt.js";
import {
  addRentingGame,
  getRentingGamesByUser,
  getRentingGameById,
  getBestGameRenting,
  listGames,
} from "../controllers/rentingGamesController.js";

//add missing imports

const router = Router();

/** auth endpoints */
router.post("/rentingGames/add", isValidJwt, addRentingGame);
router.get("/rentingGames/:id", isValidJwt, getRentingGamesByUser);
/** non auth endpoint */
router.get("/rentingGames/game/:id", getRentingGameById);
router.get("/bestRentingGames/:id", getBestGameRenting);
router.get("/rentingGames", listGames);


export default router;