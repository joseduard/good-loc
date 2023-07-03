import { Router } from 'express';
import {
  getUserProfil,
  updateUserInformation,
  getAllPseudo,
  getAllCities,
} from '../controllers/userController.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';

const router = Router();

router.put('/account/user-information', isValidJwt, updateUserInformation);
router.get('/:id', isValidJwt, getUserProfil);
router.get('/pseudo', getAllPseudo);
router.get('/cities', getAllCities);

export default router;
