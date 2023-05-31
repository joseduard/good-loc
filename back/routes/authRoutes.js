const express = require('express');
const authController = require('../controllers/authController.js');
const verifySignUp = require('../middlewares/verifySignUp.js');
const max = require("../middlewares/limit.js")

const router = express.Router();

router.post('/signup',  authController.signup);
router.post('/login',max.limiter, authController.login);
router.get('/logout',authController.logout)

module.exports = router;