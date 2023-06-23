import { Router } from "express";
const router = Router();
import { upload } from "../controllers/uploadController.js";
import { setMulterConfig } from "../../utils/middlewares/upload/setMulter.js";
import { isValidJwt } from "../../utils/middlewares/auth/verifJwt.js";
router.post("/", isValidJwt, setMulterConfig, upload);

export default router;
