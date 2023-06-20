const express = require("express");
const gamesController = require("../controllers/gamesController.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/games",gamesController.getAllGames);
router.get("/gamesByName", gamesController.getGamesByName);
router.get("/game/:id", gamesController.getGameById);

module.exports = router;
