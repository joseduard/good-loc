const express = require('express');
const userController = require('../controllers/userController.js');
const auth = require("../middlewares/auth.js")
const router = express.Router();

router.get("/:id",auth, userController.getUserProfil);
router.put("/account/user-information", auth, userController.updateUserInformation);

module.exports = router;
