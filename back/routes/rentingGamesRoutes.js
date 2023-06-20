const express = require("express");
const rentingGamesController = require("../controllers/rentingGamesController.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.post("/rentingGames/add", rentingGamesController.addRentingGame);
router.get("/rentingGames/:id", rentingGamesController.getRentingGamesByUser);
router.get('/rentingGames', rentingGamesController.listGames); 
router.get('/rentingGames/filter/city', rentingGamesController.listGames); // Filtrer par city
router.get('/rentingGames/filter/category', rentingGamesController.listGames); // Filtrer par category

module.exports = router;
