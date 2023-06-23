import db from "../../../config/db.config.js";
import UserImport from "../../../database/models/Users.js";

const User = UserImport(db.sequelize);

const checkDuplicateEmailAndPseudo = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((userWithEmail) => {
    if (userWithEmail) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    // Pseudo
    User.findOne({
      where: {
        pseudo: req.body.pseudo,
      },
    }).then((userWithPseudo) => {
      if (userWithPseudo) {
        res.status(400).send({
          message: "Failed! Pseudo is already in use!",
        });
        return;
      }

      next();
    });
  });
};

export { checkDuplicateEmailAndPseudo };
