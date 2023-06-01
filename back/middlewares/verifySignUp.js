const db = require('../config/db.config.js');

const User = require('../models/Users.js')(db.sequelize);

checkDuplicateEmail = (req, res, next) => {
        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: 'Failed! Email is already in use!'
                });
                return;
            }

            next();
        });

};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateEmail
};

module.exports = verifySignUp;
