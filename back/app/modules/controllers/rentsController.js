import db from "../../config/db.config.js";

import RentImport from "../../database/models/Rents.js";
import GamesImport from "../../database/models/Games.js";
import UserImport from "../../database/models/Users.js";
import RentalGamesImport from "../../database/models/Renting_Or_Buying_Games.js";

const Rent = RentImport(db.sequelize);
const Games = GamesImport(db.sequelize);
const User = UserImport(db.sequelize);
const RentalGames = RentalGamesImport(db.sequelize);

export const createRent = async (req, res) => {
  try {
    const game_id = req.body.game_id;
    const owner_id = req.body.owner_id;

    if (!game_id || !owner_id) {
      return res.status(400).send({ message: "game_id ou owner_id invalide" });
    }

    const rentalGame = await RentalGames.findOne({
      where: {
        game_id: game_id,
        owner_id: owner_id,
      },
    });

    if (!rentalGame) {
      return res
        .status(405)
        .send({ message: "Jeu et propriétaire non trouvés" });
    } else {
      const checkRent = await Rent.findOne({
        where: {
          user_game_id: req.body.rental_game_id,
          status: ["reserved", "rented"],
        },
      });
      if (!checkRent) {
        const rent = await Rent.create({
          beginning_date: req.body.beginning_date,
          user_id_owner: owner_id,
          user_id_renter: req.body.renter_id,
          user_game_id: req.body.rental_game_id,
          status: req.body.status,
          price: req.body.price,
        });

        const game = await Games.findOne({
          where: {
            id: game_id,
          },
        });

        res.status(201).json({ rent, game });
      } else {
        return res.status(405).json({ message: "Jeu déjà loué" });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la création de la location:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la location" });
  }
};

export const UpdateRentStatus = async (req, res) => {
  const checkRent = await Rent.findOne({
    where: {
      id: req.params.id,
    },
  });
  const userId = req.body.user_id;
  if (checkRent.user_id_owner === userId) {
    if (checkRent.status === "reserved") {
      await Rent.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ checkRent, status: "rented" });
    } else if (checkRent.status === "rented") {
      await Rent.update(
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
      res.status(201).json({ checkRent, status: "closed" });
    } else {
      return res
        .status(405)
        .json({ message: "Vous n'êtes pas le propriétaire de cette location" });
    }
  }
};

export const getRentsByUserId = async (req, res) => {
  const page = req.query.page;
  const limit = Number(req.query.pageSize) ?? 5;
  const status = req.params.status;
  const offset = (parseInt(page) - 1) * limit;

  try {
    const { rows ,count} = await Rent.findAndCountAll({
      where: {
        user_id_owner: req.params.idRentOwner,
        status: status ?? null,
      },
      limit,
      offset,
    });
    const rents = rows
    if (rents.length === 0) {
      return res.status(404).json({ message: "Aucune location en cours" });
    }

    const transformedRents =  await Promise.all(rents.map( async (rent) => {
      const rentingGame = await RentalGames.findOne({
        where: {
          id: rent.user_game_id,
        },
        attributes: ["game_id"],
        include: [
          {
            model: Games,
            attributes: ["id", "name", "img", "min_players", "max_players", "age_min"],
          },
        ],
      });
      const associatedGame = rentingGame.Game;

      const associatedUser = await User.findOne({
            where: {
              id: rent.user_id_renter,
            },
            attributes: ["id", "pseudo", "email", "img"],
          }
      );
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
    }));


    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      totalItems: count,
      currentPage: page,
      totalPages: totalPages,
      rents: transformedRents,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des locations:", error);
    res
        .status(500)
        .json({ error: "Erreur lors de la récupération des locations" });
  }
};