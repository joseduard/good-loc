const express = require("express");
const authController = require("../controllers/authController.js");
const verifySignUp = require("../middlewares/verifySignUp.js");
const max = require("../middlewares/limit.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();
router.post(
  "/register",
  verifySignUp.checkDuplicateEmail,
  authController.register
);

router.post("/login", max.limiter, authController.login);
router.put("/logout", auth, authController.logout);

module.exports = router;
