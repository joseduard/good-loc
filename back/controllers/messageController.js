const db = require("../config/db.config.js");
const Message = require("../models/Message.js")(db.sequelize);
const Users = require("../models/Users.js")(db.sequelize);

require("dotenv").config();

exports.CreateMessage = (req, res) => {
  const receiverPseudo = req.body.receiver_pseudo;

  Users.findOne({
    where: {
      pseudo: receiverPseudo.toLowerCase(),
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      Message.create({
        receiver_id: user.id,
        sender_id: req.body.sender_id,
        object: req.body.object,
        message_content: req.body.message_content,
      })
        .then((message) => {
          res.send({ message: "Message was created & sent" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllUserMessages = (req, res) => {
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

exports.findOneMessage = (req, res) => {
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

exports.deleteMessage = (req, res) => {
  const messageId = req.query.messageId;
  const userId = req.query.userId;

  Message.findOne({
    where: { id: messageId, receiver_id: userId }, // Vérifiez si l'id_receiver du message est égal à l'id de l'utilisateur en cours
  })
    .then((message) => {
      if (!message) {
        return res
          .status(404)
          .send({ message: "Message not found or unauthorized" });
      }
      message
        .destroy()
        .then(() => {
          res.send({ message: "Message deleted successfully" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
