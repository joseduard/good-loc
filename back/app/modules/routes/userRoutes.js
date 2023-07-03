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
router.get('/pseudo', getAllPseudo);
router.get('/cities', getAllCities);
router.get('/:id', isValidJwt, getUserProfil);

export default router;
