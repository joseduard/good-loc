import { Router } from "express";
import {
  getAllCategories,
  getAllCities,
  getAllMechanics,
  getAllPseudo,
} from "../controllers/filterController.js";

const router = Router();

router.get("/categories", getAllCategories);
router.get("/cities", getAllCities);
router.get("/mechanics", getAllMechanics);
router.get("/pseudo", getAllPseudo);

export default router;
