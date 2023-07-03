import { Sequelize } from 'sequelize';

export const getAllGames = async (req, res) => {
  const { games } = req['models'];
  try {
    const gamesRes = await games.findAll({ limit: 100 });
    res.status(200).json(gamesRes);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
};

export const getGamesByName = async (req, res) => {
  const { games } = req['models'];
  const gameName = req.params.name;

  try {
    const gamesRes = await games.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${gameName}%`,
        },
      },
    });

    res.status(200).json(gamesRes);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
};

export const getGameById = async (req, res) => {
  const { games, categories, mechanicsType, publishers } = req['models'];
  const gameId = req.params.id;

  try {
    const game = await games.findOne({
      where: {
        id: gameId,
      },
    });

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

    const gameWithNames = {
      ...game.toJSON(),
      category_name: category ? category.name : null,
      mechanic_name: mechanic ? mechanic.name : null,
      publisher_name: publisher ? publisher.name : null,
    };

    res.status(200).json(gameWithNames);
  } catch (error) {
    console.error('Erreur lors de la récupération du jeu :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du jeu' });
  }
};

export const getAllGamesName = async (req, res) => {
  const { games, categories, mechanicsType, publishers } = req['models'];
  try {
    const gamesRes = await games.findAll({ attributes: ['id', 'name'] });
    const nameList = gamesRes.map((game) => game.name);
    res.status(200).json(nameList);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
};
