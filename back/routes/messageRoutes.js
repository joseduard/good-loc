const express = require('express');
const messageController = require('../controllers/messageController.js');
const auth = require("../middlewares/auth.js")

const router = express.Router();
router.post("/create", auth, messageController.CreateMessage);
router.get('/list/:userId',auth, messageController.getAllUserMessages);
router.get('/:messageId', auth, messageController.findOneMessage);
router.delete('/', auth, messageController.deleteMessage);

module.exports = router;
