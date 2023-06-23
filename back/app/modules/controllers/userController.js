import UsersImport from "../../database/models/Users.js";
import db from "../../config/db.config.js";
const Users = UsersImport(db.sequelize);

export const getUserProfil = (req, res) => {
  const userId = req.params.id;
  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(405).send({ message: "User not found" });
      }
      res.status(200).send({
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        city: user.city,
        role: user.role,
        pseudo: user.pseudo,
        email: user.email,
        img: user.img,
        description: user.description,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const updateUserInformation = (req, res) => {
  const userId = req.body.id;

  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(405).send({ message: "User not found" });
      }

      user.lastname = req.body.lastname || user.lastname;
      user.firstname = req.body.firstname || user.firstname;
      user.city = req.body.city || user.city;
      user.email = req.body.email || user.email;
      user.pseudo = req.body.pseudo || user.pseudo;
      user.role = req.body.role || user.role;
      user.description = req.body.description || user.description;
      user.img = req.body.img || user.img;
      return user.save();
    })
    .then(() => {
      res.send({ message: "User was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
