const express = require('express');
const userController = require('../controllers/userController.js');
const auth = require("../middlewares/auth.js")

const router = express.Router();
router.get("/:id",auth, userController.getUserProfil);

module.exports = router;
