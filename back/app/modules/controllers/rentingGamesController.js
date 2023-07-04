import { Op } from 'sequelize';

/**
 * Add a renting game.
 *
 * @param req
 * @param {Object} res
 * @returns {Object}
 */
export const addRentingGame = async (req, res) => {
  const { games, rentingOrBuyingGames } = req['models'];
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
    const game = await games.findOne({
      where: {
        id: id,
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Le jeu spécifié n'existe pas" });
    }

    // check if the game is already in renting by the same owner
    const existingRentingGame = await rentingOrBuyingGames.findOne({
      where: {
        game_id: game.id,
        owner_id: ownerId,
      },
    });

    if (existingRentingGame) {
      return res
        .status(400)
        .json({ error: 'Le jeu spécifié est déjà en location ou à la vente' });
    }

    // insert a new renting game
    await rentingOrBuyingGames.create({
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
      .json({ message: 'La location a été ajoutée avec succès' });
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
  const { games, rentingOrBuyingGames } = req['models'];
  let { page, pageSize } = req.query;
  page = req.query.page || 1;
  const limit = parseInt(pageSize) || 10;
  const offset = (parseInt(page) - 1) * limit || 1;
  const userId = req.params.id;

  try {
    const { count, rows: rentingGames } =
      await rentingOrBuyingGames.findAndCountAll({
        where: {
          owner_id: userId,
        },
        include: [
          {
            model: games,
            as: 'game',
            attributes: ['id', 'name', 'img'],
          },
        ],
        limit,
        offset,
      });

    return res.status(200).json({
      totalItems: count,
      currentPage: parseInt(page),
      totalPages: Math.floor(count / limit),
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
  const {
    users,
    categories,
    mechanicsType,
    publishers,
    rentingOrBuyingGames,
    games,
  } = req['models'];
  try {
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
      whereCondition['$owner.city$'] = { [Op.like]: `%${city}%` };
    }

    // Récupérer l'ID de la catégorie en fonction du nom
    if (categoryName) {
      const category = await categories.findOne({
        attributes: ['id'],
        where: { name: categoryName },
      });

      if (category) {
        whereCondition['$game.category_id$'] = category.id;
      }
    }

    // Filtre par nom de jeu
    if (gameName) {
      whereCondition['$game.name$'] = { [Op.like]: `%${gameName}%` };
    }

    includeCondition.push({
      model: games,
      as: 'game',
      attributes: [
        'id',
        'img',
        'name',
        'publisher_id',
        'description',
        'category_id',
        'mechanics_type_id',
        'price',
        'year_published',
        'min_players',
        'max_players',
        'playtime',
        'age_min',
        'average_learning_complexity',
        'average_strategy_complexity',
        'average_note',
        'average_price_buy',
        'average_price_location',
        'upc',
      ],
      where: whereCondition ? whereCondition : null,
    });

    const { rows, count } = await rentingOrBuyingGames.findAndCountAll({
      include: [
        {
          model: users,
          as: 'owner',
          attributes: [
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'role',
            'img',
            'description',
            'isLoggedIn',
            'pseudo',
          ],
          where: city ? { city: { [Op.like]: `%${city}%` } } : null,
        },
        ...includeCondition,
      ],
      attributes: ['id', 'price_Day_Renting'],
      order: [['price_day_renting', 'ASC']],
      limit: limit,
      offset: offset,
    });

    const gamesResponse = await Promise.all(
      rows.map(async (rentedGame) => {
        const game = rentedGame.game;
        const category = game.category_id
          ? await categories.findByPk(game.category_id, {
              attributes: ['id', 'name'],
            })
          : null;

        const mechanic = game.mechanics_type_id
          ? await mechanicsType.findByPk(game.mechanics_type_id, {
              attributes: ['id', 'name'],
            })
          : null;

        const publisher = game.publisher_id
          ? await publishers.findByPk(game.publisher_id, {
              attributes: ['id', 'name'],
            })
          : null;

        return {
          ...rentedGame.toJSON(),
          Game: {
            ...game.toJSON(),
            category_name: category ? category.name : null,
            mechanic_name: mechanic ? mechanic.name : null,
            publisher_name: publisher ? publisher.name : null,
          },
        };
      })
    );

    res.json({
      totalItems: count,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(count / limit),
      games: gamesResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des jeux.",
    });
  }
};

export const getRentingGameById = async (req, res) => {
  const { games, users, rentingOrBuyingGames } = req['models'];
  try {
    const rentingGame = await rentingOrBuyingGames.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: games,
          as: 'game',
          attributes: [
            'id',
            'img',
            'name',
            'publisher_id',
            'description',
            'category_id',
            'mechanics_type_id',
            'price',
            'year_published',
            'min_players',
            'max_players',
            'playtime',
            'age_min',
            'average_learning_complexity',
            'average_strategy_complexity',
            'average_note',
            'average_price_buy',
            'average_price_location',
            'upc',
          ],
        },
        {
          model: users,
          as: 'owner',
          attributes: [
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'pseudo',
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
  const { games, users, rentingOrBuyingGames } = req['models'];
  try {
    const gameId = req.params.id;
    // Récupérer toutes les rentingGames pour le jeu spécifié
    const rentingGames = await rentingOrBuyingGames.findAll({
      where: {
        game_id: gameId,
      },
      order: [['price_day_renting', 'ASC']],
      include: [
        {
          model: games,
          as: 'game',
          attributes: [
            'id',
            'img',
            'name',
            'publisher_id',
            'description',
            'category_id',
            'mechanics_type_id',
            'price',
            'year_published',
            'min_players',
            'max_players',
            'playtime',
            'age_min',
            'average_learning_complexity',
            'average_strategy_complexity',
            'average_note',
            'average_price_buy',
            'average_price_location',
            'upc',
          ],
        },
        {
          model: users,
          as: 'owner',
          attributes: [
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'pseudo',
            'img',
          ],
        },
      ],
    });

    if (rentingGames.length === 0) {
      return res
        .status(404)
        .json({ error: 'Aucune location trouvée pour ce jeu' });
    }

    res.json(rentingGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération du jeu.",
    });
  }
};
