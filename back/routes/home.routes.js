const express = require('express');
const homeController = require('../controllers/home.controller.js');
const max = require("../middlewares/limit")

const router = express.Router();

// Route to get games for the home page
router.get('/games-home/:filters', verifJwt, max.limiter, homeController.getAvailableGames);

module.exports = router;
