const express = require("express");
const gamesController = require("../controllers/gamesController.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/games",auth, gamesController.getAllGames);
router.get("/gamesByName/:name",auth, gamesController.getGamesByName);
router.get("/game/:id",auth, gamesController.getGameById);

module.exports = router;
