import { Router } from 'express';
import {
  CreateMessage,
  getAllUserMessages,
  findOneMessage,
  deleteMessage,
} from '../controllers/messageController.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';

const router = Router();

router.post('/create', isValidJwt, CreateMessage);
router.get('/list/:userId', isValidJwt, getAllUserMessages);
router.get('/:messageId', isValidJwt, findOneMessage);
router.delete('/', isValidJwt, deleteMessage);

export default router;
