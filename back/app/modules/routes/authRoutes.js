import { Router } from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { checkDuplicateEmailAndPseudo } from '../../utils/middlewares/validation/auth/verifySignUp.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';
import { setAuthRouteRateLimit } from '../../utils/middlewares/rate-limit/setAuthRateLimit.js';
const router = Router();
router.post('/register', checkDuplicateEmailAndPseudo, register);
router.post('/login', setAuthRouteRateLimit, login);
router.put('/logout', isValidJwt, logout);

export default router;
