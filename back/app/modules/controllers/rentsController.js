export const createRent = async (req, res) => {
  const { rents, games, rentingOrBuyingGames, users } = req['models'];

  try {
    const game_id = req.body.game_id;
    const owner_id = req.body.owner_id;

    if (!game_id || !owner_id) {
      return res.status(400).send({ message: 'game_id ou owner_id not valid' });
    }

    const rentalGame = await rentingOrBuyingGames.findOne({
      where: {
        game_id: game_id,
        owner_id: owner_id,
      },
    });

    if (!rentalGame) {
      return res
        .status(405)
        .send({ message: 'Jeu et propriétaire non trouvés' });
    } else {
      const checkRent = await rents.findOne({
        where: {
          user_game_id: req.body.rental_game_id,
          status: ['reserved', 'rented'],
        },
      });
      if (!checkRent) {
        const rent = await rents.create({
          beginning_date: req.body.beginning_date,
          user_id_owner: owner_id,
          user_id_renter: req.body.renter_id,
          user_game_id: req.body.rental_game_id,
          status: req.body.status,
          price: req.body.price,
        });

        const game = await games.findOne({
          where: {
            id: game_id,
          },
        });
        const renter = await users.findOne({
          where: {
            id: req.body.renter_id,
          },
        });
        const owner = await users.findOne({
          where: {
            id: req.body.owner_id,
          },
        });
        console.log(rent, game, renter, owner);
        res.status(201).json({ rent, game, renter, owner });
      } else {
        return res.status(405).json({ message: 'Jeu déjà loué' });
      }
    }
  } catch (error) {
    console.error('Erreur lors de la création de la location:', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la création de la location' });
  }
};

export const UpdateRentStatus = async (req, res) => {
  const { rents } = req['models'];
  const checkRent = await rents.findOne({
    where: {
      id: req.params.id,
    },
  });
  const userId = req.body.user_id;
  if (parseInt(checkRent.user_id_owner) === parseInt(userId)) {
    if (checkRent.status === 'reserved') {
      await rents.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ checkRent, status: 'rented' });
    } else if (checkRent.status === 'rented') {
      await rents.update(
        {
          status: req.body.status,
          return_date: Date.now(),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ checkRent, status: 'closed' });
    } else {
      return res
        .status(405)
        .json({ message: "You are not the owner of this rent" });
    }
  }
};

export const getRentsByUserId = async (req, res) => {
  const { rents, games, users, rentingOrBuyingGames } = req['models'];

  const page = req.query.page;
  const limit = Number(req.query.pageSize) ?? 5;
  const status = req.params.status;
  const offset = (parseInt(page) - 1) * limit;

  try {
    const { rows, count } = await rents.findAndCountAll({
      where: {
        user_id_owner: req.params.idRentOwner,
        status: status ?? null,
      },
      limit,
      offset,
    });
    const rentsRes = rows;
    if (rentsRes.length === 0) {
      return res.status(201).json({ message: 'No rent in running' });
    }

    const transformedRents = await Promise.all(
      rentsRes.map(async (rent) => {
        const rentingGame = await rentingOrBuyingGames.findOne({
          where: {
            id: rent.user_game_id,
          },
          attributes: ['game_id'],
          include: [
            {
              model: games,
              as: 'game',
              attributes: [
                'id',
                'name',
                'img',
                'min_players',
                'max_players',
                'age_min',
              ],
            },
          ],
        });
        const associatedGame = rentingGame ? rentingGame.game : null;

        const associatedUser = await users.findOne({
          where: {
            id: rent.user_id_renter,
          },
          attributes: ['id', 'pseudo', 'email', 'img', 'city'],
        });
        return {
          id: rent.id,
          user_id_owner: rent.user_id_owner,
          user_game_id: rent.user_game_id,
          user_id_renter: rent.user_id_renter,
          beginning_date: rent.beginning_date,
          price: rent.price,
          late_penalties: rent.late_penalties,
          status: rent.status,
          associatedGame,
          associatedUser,
        };
      })
    );

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      totalItems: count,
      currentPage: page,
      totalPages: totalPages,
      rents: transformedRents,
    });
  } catch (error) {
    console.error('Error retrieving rentals:', error);
    res.status(500)
      .json({ error: 'Error retrieving rentals' });
  }
};

export const getRentsByRenterId = async (req, res) => {
  const page = req.query.page;
  const limit = Number(req.query.pageSize) ?? 5;
  const status = req.params.status;
  const offset = (parseInt(page) - 1) * limit;
  const { rents, games, users, rentingOrBuyingGames } = req['models'];

  try {
    const { rows, count } = await rents.findAndCountAll({
      where: {
        user_id_renter: req.params.idRentRenter,
        status: status ?? null,
      },
      limit,
      offset,
    });
    const rentsRes = rows;
    if (rentsRes.length === 0) {
      return res.status(401).json({ message: 'No rent in running' });
    }

    const transformedRents = await Promise.all(
      rentsRes.map(async (rent) => {
        const rentingGame = await rentingOrBuyingGames.findOne({
          where: {
            id: rent.user_game_id,
          },
          attributes: ['game_id'],
          include: [
            {
              model: games,
              as: 'game',
              attributes: [
                'id',
                'name',
                'img',
                'min_players',
                'max_players',
                'age_min',
              ],
            },
          ],
        });
        const associatedGame = rentingGame ? rentingGame.game : null;

        const associatedUser = await users.findOne({
          where: {
            id: rent.user_id_owner,
          },
          attributes: ['id', 'pseudo', 'email', 'img', 'city'],
        });
        return {
          id: rent.id,
          user_id_owner: rent.user_id_owner,
          user_game_id: rent.user_game_id,
          user_id_renter: rent.user_id_renter,
          beginning_date: rent.beginning_date,
          price: rent.price,
          late_penalties: rent.late_penalties,
          status: rent.status,
          associatedGame,
          associatedUser,
        };
      })
    );

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      totalItems: count,
      currentPage: page,
      totalPages: totalPages,
      rents: transformedRents,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des locations:', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des locations' });
  }
};
export const deleteByOwner = async (req, res) => {
  const { rents } = req['models'];

  try {
    const rent = await rents.findOne({
      where: {
        id: req.params.idRent,
        user_id_owner: req.params.idOwner,
        status: 'reserved',
      },
    });

    if (!rent) {
      return res
        .status(404)
        .json({
          message: 'Location not found or the status is not "reserved"',
        });
    }

    await rents.destroy({
      where: {
        id: req.params.idRent,
        user_id_owner: req.params.idOwner,
      },
    });

    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting the rental:', error);
    res
      .status(500)
      .json({ error: 'Error deleting the rental' });
  }
};

export const deleteByRenter = async (req, res) => {
  const { rents } = req['models'];

  try {
    const rent = await rents.findOne({
      where: {
        id: req.params.idRent,
        user_id_renter: req.params.idRenter,
        status: 'reserved',
      },
    });

    if (!rent) {
      return res
        .status(404)
        .json({
          message: 'Location not found or the status is not "reserved"',
        });
    }

    await rents.destroy({
      where: {
        id: req.params.idRent,
        user_id_renter: req.params.idRenter,
      },
    });

    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting the rental:', error);
    res
      .status(500)
      .json({ error: 'Error deleting the rental' });
  }
};
