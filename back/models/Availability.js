const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Availability', {
    renting_or_buying_game_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Renting_Or_Buying_Games',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Availability',
    timestamps: false,
    indexes: [
      {
        name: "renting_or_buying_game_id",
        using: "BTREE",
        fields: [
          { name: "renting_or_buying_game_id" },
        ]
      },
    ]
  });
};
