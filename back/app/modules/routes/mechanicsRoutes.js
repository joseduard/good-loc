import { Router } from 'express';
import { getAllMechanics } from '../controllers/mechanicsController.js';

const router = Router();

router.get('/mechanics', getAllMechanics);
export default router;
