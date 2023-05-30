const { Sequelize } = require('sequelize');
const db = require('../config/db.config.js');

const User = db.sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = User;