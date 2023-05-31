const express = require('express');
const controller = require('../controllers/authRoutes.js');
const verifySignUp = require('../middlewares/verifySignUp.js');
const max = require("../middlewares/limit.js")

const router = express.Router();

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);
router.post('/login',max.limiter, controller.login);
router.get('/logout',controller.logout)

module.exports = router;