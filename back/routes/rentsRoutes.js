const express = require("express");
const rentsController = require("../controllers/rentsController.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();


router.post("/rent/create",auth, rentsController.createRent);
router.put("/rent/:id/updateStatus",auth, rentsController.UpdateRentStatus);
router.get("/user/account/rent/",auth, rentsController.getRentsByUserId);


module.exports = router;
