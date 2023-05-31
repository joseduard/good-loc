const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db.config.js');
const Users = require('../models/Users.js')(db.sequelize);

require('dotenv').config();

exports.signup = (req, res) => {
    Users.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({ message: 'User was registered successfully!' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.login = (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User Not found.' });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password!'
                });
            }

            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.name,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.logout = async (req, res) => {
    try {
        const userId = req.body.user.id; 
        // update user without token
        await User.update({ token: null }, { where: { id: userId } });
        res.status(200).json({ message: 'Déconnexion réussie' });

    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion' });
    }
};