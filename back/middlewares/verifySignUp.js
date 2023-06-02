const db = require('../config/db.config.js');
const User = require('../models/Users.js')(db.sequelize);

checkDuplicateEmailAndPseudo = (req, res, next) => {
    // Email
    User.findOne({
        where: {
            email: req.body.userEmail
        }
    }).then(userWithEmail => {
        if (userWithEmail) {
            res.status(400).send({
                message: 'Failed! Email is already in use!'
            });
            return;
        }

        // Pseudo
        User.findOne({
            where: {
                pseudo: req.body.pseudo
            }
        }).then(userWithPseudo => {
            if (userWithPseudo) {
                res.status(400).send({
                    message: 'Failed! Pseudo is already in use!'
                });
                return;
            }

            next();
        });
    });
};

const verifySignUp = {
    checkDuplicateEmailAndPseudo: checkDuplicateEmailAndPseudo
};

module.exports = verifySignUp;
