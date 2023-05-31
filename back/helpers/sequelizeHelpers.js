exports.loadSequelizeModels = (req)=> {
    const db = require('../config/db.config.js');
    const { initModels } = require("../models/init-models");
    initModels(db.sequelize);
    db.sequelize.sync();
}