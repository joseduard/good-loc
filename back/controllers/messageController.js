
const db = require("../config/db.config.js");
const Message = require("../models/Message.js")(db.sequelize);

require("dotenv").config();

exports.CreateMessage = (req, res) => {
  
  Message.create({
    receiver_id: req.body.receiver_id,
    sender_id: req.body.user_id,
    object: req.body.object,
    message_content: req.body.message_content,
  })
      .then((message) => {
      res.send({ message: "Message was created & sent " });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.seeAll = (req, res) => {
  const userId = req.params.userId; 
  Message.findAll({
    where: { receiver_id: userId },
  })
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.seeOneMessage = (req, res) => {
  const messageId = req.params.messageId; 
  Message.findOne({
    where: { id: messageId },
  })
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

