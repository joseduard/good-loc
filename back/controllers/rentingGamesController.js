const db = require("../config/db.config.js");
const RentingGames = require("../models/Renting_Or_Buying_Games.js")(db.sequelize);
const Games = require("../models/Games.js")(db.sequelize);
const Users = require("../models/Users.js")(db.sequelize);
const Categories = require("../models/Categories.js")(db.sequelize);
const { sequelize, Op } = require('sequelize');


require("dotenv").config();

/**
 * Add a renting game.
 *
 * @param {Object} - body.
 * @param {Object} res 
 * @returns {Object} 
 */
exports.addRentingGame = async (req, res) => {
  const { id, ownerId, priceDayRenting, discountMoreDayRenting, discountWeekRenting, priceBuying, cautionPrice } = req.body;

  try {
    // find the game in table "Games"
    const game = await Games.findOne({
      where: {
        id: id,
      }
    });

    if (!game) {
      return res.status(404).json({ error: 'Le jeu spécifié n\'existe pas' });
    }

    // check if the game is already in renting by the same owner
    const existingRentingGame = await RentingGames.findOne({
      where: {
        game_id: game.id,
        owner_id: ownerId
      }
    });

    if (existingRentingGame) {
      return res.status(400).json({ error: 'Le jeu spécifié est déjà en location ou à la vente' });
    }

    // insert a new renting game
    await RentingGames.create({
      game_id: game.id,
      owner_id: ownerId,
      price_day_renting: priceDayRenting,
      discount_moreday_renting: discountMoreDayRenting,
      discount_week_renting: discountWeekRenting,
      price_buying: priceBuying,
      caution_price: cautionPrice
    });

    return res.status(200).json({ message: 'La location a été ajoutée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la location :', error);
    return res.status(500).json({ error: 'Erreur lors de l\'ajout de la location' });
  }
};

/** récupère les jeux de location d'un utilisateur spécifié.
 * @param {*} req.params.id - userId.
 * @param {*} req.query.page - page.
 * @param {*} req.query.pageSize - pageSize.
 * @param {*} rentingGames
 * @returns {Object} - L'objet JSON contenant les jeux de location de l'utilisateur.*/ 

exports.getRentingGamesByUser = async (req, res) => {
  const { page, pageSize } = req.query;
  const limit = parseInt(pageSize) || 10;
  const offset = (parseInt(page) - 1) * limit;
  const userId  = req.params.id;

  try {
    const { count, rows: rentingGames } = await RentingGames.findAndCountAll({
      where: {
        owner_id: userId,
      },
      limit,
      offset,
    });

    return res.status(200).json({
      totalItems: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      rentingGames,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des locations de l\'utilisateur :', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des locations de l\'utilisateur' });
  }
};

exports.listGames = async (req, res) => {
  try {
    const city = req.query.city;
    const categoryName = req.query.category;

    let whereCondition = {};
    let includeCondition = [];

    // Filtrer par ville
    if (city) {
      whereCondition['$User.city$'] = city;
    }

    // Récupérer l'ID de la catégorie en fonction du nom
    if (categoryName) {
      const category = await Categories.findOne({
        attributes: ['id'],
        where: { name: categoryName }
      });

      if (category) {
        whereCondition['$Game.category_id$'] = category.id; // Utiliser Game au lieu de Games
      }
    }

    includeCondition.push({
      model: Games, // Utiliser Games au lieu de Game
      attributes: ['id', 'img', 'name', 'publisher_id', 'description', 'category_id', 'mechanics_type_id', 'price', 'year_published', 'min_players', 'max_players', 'playtime', 'age_min', 'average_learning_complexity', 'average_strategy_complexity', 'average_note', 'average_price_buy', 'average_price_location', 'upc'],
      where: whereCondition ?? null,
    });

    const games = await RentingGames.findAll({
      include: [
        {
          model: Users,
          as: 'User',
          attributes: ['id', 'firstname', 'lastname', 'email', 'city', 'role', 'img', 'description', 'isLoggedIn', 'pseudo'],
          where: city ? { city: city } : null,
          
        },
        ...includeCondition
      ],
      attributes: ['id', 'price_Day_Renting'],
      order: [['price_day_renting', 'ASC']]
    });

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des jeux." });
  }
};

exports.getRentingGameById = async (req, res) => {
  try {
    const rentingGame = await RentingGames.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Games,
          attributes: ['id', 'img', 'name', 'publisher_id', 'description', 'category_id', 'mechanics_type_id', 'price', 'year_published', 'min_players', 'max_players', 'playtime', 'age_min', 'average_learning_complexity', 'average_strategy_complexity', 'average_note', 'average_price_buy', 'average_price_location', 'upc'],
        },
        {
          model: Users,
          as: 'User',
          attributes: ['id', 'firstname', 'lastname', 'email', 'city', 'pseudo'],
        },
      ],
    });
    res.json(rentingGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du jeu." });
  }
};

exports.getBestGameRenting = async (req, res) => {
  try {
    const gameId = req.params.id;
    console.log(gameId)
    // Récupérer toutes les rentingGames pour le jeu spécifié
    const rentingGames = await RentingGames.findAll({
      where: {
        game_id: gameId
      },
      order: [['price_day_renting', 'ASC']],
      include: [
        {
          model: Games,
          attributes: ['id', 'img', 'name', 'publisher_id', 'description', 'category_id', 'mechanics_type_id', 'price', 'year_published', 'min_players', 'max_players', 'playtime', 'age_min', 'average_learning_complexity', 'average_strategy_complexity', 'average_note', 'average_price_buy', 'average_price_location', 'upc'],
        },
        {
          model: Users,
          as: 'User',
          attributes: ['id', 'firstname', 'lastname', 'email', 'city', 'pseudo'],
        },
      ],
    });

    if (rentingGames.length === 0) {
      return res.status(404).json({ error: 'Aucune location trouvée pour ce jeu' });
    }

    res.json(rentingGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du jeu." });
  }
};
