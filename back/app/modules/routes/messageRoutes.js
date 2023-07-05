import { Router } from 'express';
import {
  CreateMessage,
  getAllUserMessages,
  findOneMessage,
  deleteMessage,
  markMessageIsRead,
  getUnreadMessagesForUser,
  countUnreadMessages,
} from '../controllers/messageController.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';

const router = Router();

router.post('/create', isValidJwt, CreateMessage);
router.get('/list/:userId', isValidJwt, getAllUserMessages);
router.get('/:messageId', isValidJwt, findOneMessage);
router.delete('/', isValidJwt, deleteMessage);
router.put('/new-status/:userId/:messageId', isValidJwt, markMessageIsRead);
router.get('/unread/:userId', isValidJwt, getUnreadMessagesForUser);
router.get('/unread/count/:userId', isValidJwt, countUnreadMessages);

export default router;
