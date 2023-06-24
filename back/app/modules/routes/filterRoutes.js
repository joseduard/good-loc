import { Router } from "express";
import {
  getAllCategories,
  getAllCities,
  getAllMechanics,
} from "../controllers/filterController.js";
import { isValidJwt } from "../../utils/middlewares/auth/verifJwt.js";

const router = Router();

router.get("/categories", isValidJwt, getAllCategories);
router.get("/cities", isValidJwt, getAllCities);
router.get("/mechanics", isValidJwt, getAllMechanics);

export default router;
