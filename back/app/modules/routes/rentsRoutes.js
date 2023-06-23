import { Router } from "express";
import { isValidJwt } from "../../utils/middlewares/auth/verifJwt.js";
import {
  createRent,
  UpdateRentStatus,
  getRentsByUserId,
} from "../controllers/rentsController.js";

const router = Router();

router.post("/rent/create", isValidJwt, createRent);
router.put("/rent/:id/updateStatus", isValidJwt, UpdateRentStatus);
router.get("/user/account/rent/:idRentOwner/:status", isValidJwt, getRentsByUserId);

export default router;
