import { DataTypes as dt } from "sequelize";

export default function (sequelize, DataTypes = dt) {
  const categories = sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Categories",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  categories.associate = (models) => {
    categories.hasMany(models.Games, {
      foreignKey: "category_id",
      as: "games", // Define the alias for the association
    });
  };
  return categories;
}
