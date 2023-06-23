import { Router } from "express";
import {
  getUserProfil,
  updateUserInformation,
} from "../controllers/userController.js";
import { isValidJwt } from "../../utils/middlewares/auth/verifJwt.js";
const router = Router();

router.get("/:id", isValidJwt, getUserProfil);
router.put("/account/user-information", isValidJwt, updateUserInformation);

export default router;
