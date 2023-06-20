const express = require("express");
const rentsController = require("../controllers/rentsController.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.post("/rent/create", rentsController.createRent);
router.put("/rent/:id/updateStatus", rentsController.UpdateRentStatus);
router.get("/user/account/rent/", rentsController.getRentsByUserId);

module.exports = router;
