import db from "../../config/db.config.js";
import GamesImport from "../../database/models/Games.js";
import CategoriesImport from "../../database/models/Categories.js";
import MechanicsTypeImport from "../../database/models/Mechanics_Type.js";
import PublishersImport from "../../database/models/Publishers.js";
import Sequelize from "sequelize";

const Games = GamesImport(db.sequelize);
const Categories = CategoriesImport(db.sequelize);
const MechanicsType = MechanicsTypeImport(db.sequelize);
const Publishers = PublishersImport(db.sequelize);

export const getAllGames = async (req, res) => {
  try {
    const games = await Games.findAll({ limit: 100 });
    res.status(200).json(games);
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des jeux" });
  }
};

export const getGamesByName = async (req, res) => {
  const gameName = req.params.name;

  try {
    const games = await Games.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${gameName}%`,
        },
      },
    });

    res.status(200).json(games);
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des jeux" });
  }
};

export const getGameById = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Games.findOne({
      where: {
        id: gameId,
      },
    });
    
    const category = game.category_id
      ? await Categories.findByPk(game.category_id, {
          attributes: ["id", "name"],
        })
      : null;

    const mechanic = game.mechanics_type_id
      ? await MechanicsType.findByPk(game.mechanics_type_id, {
          attributes: ["id", "name"],
        })
      : null;

    const publisher = game.publisher_id
      ? await Publishers.findByPk(game.publisher_id, {
          attributes: ["id", "name"],
        })
      : null;

    const gameWithNames = {
      ...game.toJSON(),
      category_name: category ? category.name : null,
      mechanic_name: mechanic ? mechanic.name : null,
      publisher_name: publisher ? publisher.name : null,
    };

    res.status(200).json(gameWithNames);
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du jeu" });
  }
};

