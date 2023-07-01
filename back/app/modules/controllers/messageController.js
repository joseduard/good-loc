import usersImport from "../../database/models/Users.js"
import MessageImport from "../../database/models/Message.js"
import db from "../../config/db.config.js";
import { Op } from "sequelize";

const Users = usersImport(db.sequelize)
const Message = MessageImport(db.sequelize)
export const CreateMessage = (req, res) => {
  const receiverPseudo = req.body.receiver_pseudo;
  // add a rate limit to the amount of messages sent per 10 minutes to other users

  Users.findOne({
    where: {
      pseudo: receiverPseudo,
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

export const getAllUserMessages = (req, res) => {
  const userId = req.params.userId;
  Message.findAll({
    where:{
      [Op.or]:
     [{ receiver_id: userId },
            { sender_id: userId}
          ]
        }
    ,
      include: [
          {
                model: Users,
                as: "sender",
                attributes: ["id", "pseudo", "img"],
          },
            {
                model: Users,
                as: "receiver",
                attributes: ["id", "pseudo", "img"],

            }

      ]
  })
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const findOneMessage = (req, res) => {
  const messageId = req.params.messageId;
  Message.findOne({
    where: { id: messageId },
      include: [
            {
                model: Users,
                as: "sender",
                attributes: ["id", "pseudo", "img"],
            },
            {
                model: Users,
                as: "receiver",
                attributes: ["id", "pseudo", "img"],
            },
        ],

  })
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const deleteMessage = (req, res) => {
  const messageId = req.query.messageId;
  const userId = req.query.userId;

  Message.findOne({
    where: { id: messageId, [Op.or]:
      [{ receiver_id: userId },
             { sender_id: userId}
           ]
  }, // Vérifiez si l'id_receiver du message est égal à l'id de l'utilisateur en cours ou du sender
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

