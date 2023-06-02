"use strict";
const config = require("../config/config").production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      // Suppression de la contrainte de clé étrangère existante dans la table Games
      await queryInterface.sequelize.query(
        'ALTER TABLE `Games` DROP FOREIGN KEY `Games_ibfk_1`;',
        { transaction }
      );

      // Modification de la structure de la table Publishers
      await queryInterface.changeColumn(
        "Publishers",
        "id",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      // Modification de la structure de la table Games
      await queryInterface.changeColumn(
        "Games",
        "publisher_id",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      // Ajout de la nouvelle contrainte de clé étrangère dans la table Games
      await queryInterface.sequelize.query(
        'ALTER TABLE `Games` ADD CONSTRAINT `publisher_id` FOREIGN KEY (`Games_ibfk_1`) REFERENCES `Publishers` (`id`);',
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Si nécessaire, écrivez la migration de suppression ici
  },
};