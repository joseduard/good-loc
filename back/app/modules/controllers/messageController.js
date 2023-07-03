import { Op } from 'sequelize';

export const CreateMessage = (req, res) => {
  const { users, message } = req['models'];
  const receiverPseudo = req.body.receiver_pseudo;
  // add a rate limit to the amount of messages sent per 10 minutes to other users
  users
    .findOne({
      where: {
        pseudo: receiverPseudo,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      message
        .create({
          receiver_id: user.id,
          sender_id: req.body.sender_id,
          object: req.body.object,
          message_content: req.body.message_content,
        })
        .then(() => {
          res.send({ message: 'Message was created & sent' });
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
  const { users, message } = req['models'];
  const userId = req.params.userId;
  message
    .findAll({
      where: {
        [Op.or]: [{ receiver_id: userId }, { sender_id: userId }],
      },
      include: [
        {
          model: users,
          as: 'sender',
          attributes: ['id', 'pseudo', 'img'],
        },
        {
          model: users,
          as: 'receiver',
          attributes: ['id', 'pseudo', 'img'],
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

export const findOneMessage = (req, res) => {
  const { users, message } = req['models'];

  const messageId = req.params.messageId;
  message
    .findOne({
      where: { id: messageId },
      include: [
        {
          model: users,
          as: 'sender',
          attributes: ['id', 'pseudo', 'img'],
        },
        {
          model: users,
          as: 'receiver',
          attributes: ['id', 'pseudo', 'img'],
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
  const { message } = req['models'];

  const messageId = req.query.messageId;
  const userId = req.query.userId;

  message
    .findOne({
      where: {
        id: messageId,
        [Op.or]: [{ receiver_id: userId }, { sender_id: userId }],
      }, // Vérifiez si l'id_receiver du message est égal à l'id de l'utilisateur en cours ou du sender
    })
    .then((message) => {
      if (!message) {
        return res
          .status(404)
          .send({ message: 'Message not found or unauthorized' });
      }
      message
        .destroy()
        .then(() => {
          res.send({ message: 'Message deleted successfully' });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
