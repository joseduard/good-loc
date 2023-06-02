
const db = require("../config/db.config.js");
const Users= require("../models/Users.js")(db.sequelize);

require("dotenv").config();


exports.getUserProfil = (req, res) => {
    userId = req.params.id;
    console.log(userId);
  Users.findOne({
    where: {
      id: userId
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(405).send({ message: "User not found" });
      }
      res.status(200).send({
        id: user.id,
        userName: user.lastname,
        userFirstname: user.firstname,
        userCity: user.city,
        userRole: user.role,
        userPseudo: user.pseudo,
        userEmail: user.email,
        userIsLogged: user.isLoggedIn,
        userImg: user.img,
        userDescription: user.description,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

