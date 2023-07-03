import { Router } from 'express';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';
import {
  createRent,
  UpdateRentStatus,
  getRentsByUserId,
  getRentsByRenterId,
} from '../controllers/rentsController.js';

const router = Router();

router.post('/rent/create', isValidJwt, createRent);
router.put('/rent/:id/updateStatus', isValidJwt, UpdateRentStatus);
router.get(
  '/user/account/rent/:idRentOwner/:status',
  isValidJwt,
  getRentsByUserId
);
router.get(
  '/user/account/renting/:idRentRenter/:status',
  isValidJwt,
  getRentsByRenterId
);

export default router;
