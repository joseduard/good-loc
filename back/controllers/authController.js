const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db.config.js");
const Users = require("../models/Users.js")(db.sequelize);

require("dotenv").config();

// write a jsdoc for this controller method
/**
 *
 * @param {*} req test
 * @param {*} res
 */
exports.register = (req, res) => {
  Users.create({
    email: req.body.email,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    password: bcrypt.hashSync(req.body.password, 8),
    pseudo: req.body.pseudo,
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Mot de passe incorrect !",
        });
      }

      // Mettre à jour la valeur de isLogged à true
      Users.update(
        { isLoggedIn: true },
        {
          where: {
            id: user.id,
          },
        }
      )

        .then(() => {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
          });

          res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await Users.update(
      { isLoggedIn: false },
      {
        where: {
          id: user.id,
        },
      }
    );

    const updatedUser = await Users.findByPk(userId); // Fetch the updated user data from the database

    res
      .status(200)
      .json({ message: `l'utilisateur avec l'id ${userId} a été deconnecté` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la déconnexion" });
  }
};
