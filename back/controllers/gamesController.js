const db = require("../config/db.config.js");
const Games = require("../models/Games.js")(db.sequelize);
const Sequelize = require("sequelize");

exports.getAllGames = async (req, res) => {
  try {
      const games = await Games.findAll({ limit: 100 });
    res.status(200).json(games);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
};

exports.getGamesByName = async (req, res) => {
  const gameName = req.params.name;

  try {
    const games = await Games.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${gameName}%`
        }
      }
    });

    res.status(200).json(games);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
};

exports.getGameById = async (req, res) => {
    const gameId = req.params.id;
    
    try {
        const game = await Games.findOne({
        where: {
            id: gameId
        }
        });
    
        res.status(200).json(game);
    } catch (error) {
        console.error('Erreur lors de la récupération du jeu :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du jeu' });
    }
}


