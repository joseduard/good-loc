import { Router } from "express";
import {
  getAllCategories,
  getAllCities,
  getAllMechanics,
} from "../controllers/filterController.js";

const router = Router();

router.get("/categories", getAllCategories);
router.get("/cities", getAllCities);
router.get("/mechanics", getAllMechanics);

export default router;
