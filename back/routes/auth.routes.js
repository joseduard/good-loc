const express = require('express');
const controller = require('../controllers/auth.controller.js');
const verifySignUp = require('../middlewares/verifySignUp');
const max = require("../middlewares/limit")

const router = express.Router();

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);
router.post('/signin',max.limiter, controller.signin);

module.exports = router;