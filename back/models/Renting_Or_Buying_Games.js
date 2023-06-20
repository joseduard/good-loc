const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const Users = require("../models/Users.js")(db.sequelize);
const Games = require("../models/Games.js")(db.sequelize);

module.exports = function (sequelize, DataTypes = Sequelize.DataTypes) {
  const RentingOrBuyingGames = sequelize.define(
    "Renting_Or_Buying_Games",
    {
      // Définition des attributs de RentingOrBuyingGames
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      game_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: "Games",
          key: "id",
        },
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      price_day_renting: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      discount_moreday_renting: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      discount_week_renting: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      price_buying: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      caution_price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Renting_Or_Buying_Games",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "game_id",
          using: "BTREE",
          fields: [{ name: "game_id" }],
        },
        {
          name: "owner_id",
          using: "BTREE",
          fields: [{ name: "owner_id" }],
        },
      ],
    }
  );

  RentingOrBuyingGames.belongsTo(Users, { foreignKey: "owner_id" }); 
  RentingOrBuyingGames.belongsTo(Games, { foreignKey: "game_id" });


  return RentingOrBuyingGames;
};