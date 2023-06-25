import db from "../../config/db.config.js";
import RentingGamesImport from "../../database/models/Renting_Or_Buying_Games.js";
import GamesImport from "../../database/models/Games.js";
import UsersImport from "../../database/models/Users.js";
import CategoriesImport from "../../database/models/Categories.js";
import MechanicsTypeImport from "../../database/models/Mechanics_Type.js";
import PublishersImport from "../../database/models/Publishers.js";
import {Op} from "sequelize";

const RentingGames = RentingGamesImport(db.sequelize);
const Games = GamesImport(db.sequelize);
const Users = UsersImport(db.sequelize);
const Categories = CategoriesImport(db.sequelize);
const MechanicsType = MechanicsTypeImport(db.sequelize);
const Publishers = PublishersImport(db.sequelize);
/**
 * Add a renting game.
 *
 * @param req
 * @param {Object} res
 * @returns {Object}
 */
export const addRentingGame = async (req, res) => {
  const {
    id,
    ownerId,
    priceDayRenting,
    discountMoreDayRenting,
    discountWeekRenting,
    priceBuying,
    cautionPrice,
  } = req.body;

  try {
    // find the game in table "Games"
    const game = await Games.findOne({
      where: {
        id: id,
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Le jeu spécifié n'existe pas" });
    }

    // check if the game is already in renting by the same owner
    const existingRentingGame = await RentingGames.findOne({
      where: {
        game_id: game.id,
        owner_id: ownerId,
      },
    });

    if (existingRentingGame) {
      return res
        .status(400)
        .json({ error: "Le jeu spécifié est déjà en location ou à la vente" });
    }

    // insert a new renting game
    await RentingGames.create({
      game_id: game.id,
      owner_id: ownerId,
      price_day_renting: priceDayRenting,
      discount_moreday_renting: discountMoreDayRenting,
      discount_week_renting: discountWeekRenting,
      price_buying: priceBuying,
      caution_price: cautionPrice,
    });

    return res
      .status(200)
      .json({ message: "La location a été ajoutée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la location :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'ajout de la location" });
  }
};

/** récupère les jeux de location d'un utilisateur spécifié.
 * @param {*} req.params.id - userId.
 * @param {*} req.query.page - page.
 * @param {*} req.query.pageSize - pageSize.
 * @param res
 * @param req
 * @param res
 * @returns {Object} - L'objet JSON contenant les jeux de location de l'utilisateur.*/

export const getRentingGamesByUser = async (req, res) => {
  const { page, pageSize } = req.query;
  const limit = parseInt(pageSize) || 10;
  const offset = (parseInt(page) - 1) * limit;
  const userId = req.params.id;

  try {
    const { count, rows: rentingGames } = await RentingGames.findAndCountAll({
      where: {
        owner_id: userId,
      },
      include: [
        {
            model: Games,
            attributes: ["id", "name", "img"],
        }],
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
    console.error(
      "Erreur lors de la récupération des locations de l'utilisateur :",
      error
    );
    return res.status(500).json({
      error: "Erreur lors de la récupération des locations de l'utilisateur",
    });
  }
};


/** récupère une listes de jeux disponible a la location. */
export const listGames = async (req, res) => {
  try {
    //TODO : ajouter une condition pour exclure les jeux reservé et loué par l'utilisateur

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.pageSize, 10) || 10;


    const offset = (page - 1) * limit;

    const city = req.query.city;
    const categoryName = req.query.category;
    const gameName = req.query.name;

    let whereCondition = {};
    let includeCondition = [];

    // Filtrer par ville
    if (city) {
      whereCondition["$User.city$"] =        { [Op.like]: `%${city}%` };
      ;
    }

    // Récupérer l'ID de la catégorie en fonction du nom
    if (categoryName) {
      const category = await Categories.findOne({
        attributes: ["id"],
        where: { name: categoryName },
      });

      if (category) {
        whereCondition["$Game.category_id$"] = category.id; // Utiliser Game au lieu de Games
      }
    }
//filtre par name
    if (gameName) {
      whereCondition["$Game.name$"] = { [Op.like]: `%${gameName}%` };
    }

    includeCondition.push({
      model: Games, // Utiliser Games au lieu de Game
      attributes: [
        "id",
        "img",
        "name",
        "publisher_id",
        "description",
        "category_id",
        "mechanics_type_id",
        "price",
        "year_published",
        "min_players",
        "max_players",
        "playtime",
        "age_min",
        "average_learning_complexity",
        "average_strategy_complexity",
        "average_note",
        "average_price_buy",
        "average_price_location",
        "upc",
      ],
      where: whereCondition ?? null,
    });

    const {rows, count} = await RentingGames.findAndCountAll({
      include: [
        {
          model: Users,
          as: "User",
          attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "city",
            "role",
            "img",
            "description",
            "isLoggedIn",
            "pseudo",
          ],
          where: city ? { city: { [Op.like]: `%${city}%` } } : null,
        },
        ...includeCondition,
      ],
      attributes: ["id", "price_Day_Renting"],
      order: [["price_day_renting", "ASC"]],
      limit: limit,
      offset: offset,
    });
    const games = rows
    for (const rentedGame of games) {
      rentedGame.Game.category = Categories.findOne({
        where: { id: rentedGame.Game.category_id },
      });
      rentedGame.Game.mechanic = MechanicsType.findOne({
        where: { id: rentedGame.Game.mechanics_type_id },
      });
      rentedGame.Game.publisher = Publishers.findOne({
        where: { id: rentedGame.Game.publisher_id },
      });
    }


    res.json({
      totalItems: count,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(count / limit),
      games:games

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des jeux.",
    });
  }
};

export const getRentingGameById = async (req, res) => {
  try {
    const rentingGame = await RentingGames.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Games,
          attributes: [
            "id",
            "img",
            "name",
            "publisher_id",
            "description",
            "category_id",
            "mechanics_type_id",
            "price",
            "year_published",
            "min_players",
            "max_players",
            "playtime",
            "age_min",
            "average_learning_complexity",
            "average_strategy_complexity",
            "average_note",
            "average_price_buy",
            "average_price_location",
            "upc",
          ],
        },
        {
          model: Users,
          as: "User",
          attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "city",
            "pseudo",
          ],
        },
      ],
    });
    res.json(rentingGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération du jeu.",
    });
  }
};

export const getBestGameRenting = async (req, res) => {
  try {
    const gameId = req.params.id;
    console.log(gameId);
    // Récupérer toutes les rentingGames pour le jeu spécifié
    const rentingGames = await RentingGames.findAll({
      where: {
        game_id: gameId,
      },
      order: [["price_day_renting", "ASC"]],
      include: [
        {
          model: Games,
          attributes: [
            "id",
            "img",
            "name",
            "publisher_id",
            "description",
            "category_id",
            "mechanics_type_id",
            "price",
            "year_published",
            "min_players",
            "max_players",
            "playtime",
            "age_min",
            "average_learning_complexity",
            "average_strategy_complexity",
            "average_note",
            "average_price_buy",
            "average_price_location",
            "upc",
          ],
        },
        {
          model: Users,
          as: "User",
          attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "city",
            "pseudo",
          ],
        },
      ],
    });

    if (rentingGames.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucune location trouvée pour ce jeu" });
    }

    res.json(rentingGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération du jeu.",
    });
  }
};
