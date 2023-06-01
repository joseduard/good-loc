const db = require("../config/db.config.js");

const User = require("../models/Users.js")(db.sequelize);

module.exports = {
  checkDuplicateEmail: (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: req.body.userEmail,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Email deja utilisé par un autre membre!",
        });
        return;
      }

      next();
    });
  },
};
