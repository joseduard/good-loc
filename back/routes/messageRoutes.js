const express = require('express');
const messageController = require('../controllers/messageController.js');
const auth = require("../middlewares/auth.js")

const router = express.Router();
router.post("/sendMessage", auth, messageController.CreateMessage);
router.get('/:userId',auth, messageController.seeAll);
router.get('/message/:messageId',auth,messageController.seeOneMessage);

module.exports = router;
