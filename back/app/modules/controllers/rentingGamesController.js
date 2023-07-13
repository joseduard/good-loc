import { RentingGamesService } from '../services/rentingGamesService.js';

export class RentingGamesController {
  static async addRentingGame(req, res) {
    try {
      const message = await RentingGamesService.addRentingGame(req.body);
      res.status(200).json({ message });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error.message });
    }
  }

  static async getRentingGamesByUser(req, res) {
    try {
      const rentingGames = await RentingGamesService.getRentingGamesByUser({
        userId: req.userId,
        limit: req.query.limit,
        offset: req.query.offset,
      });
      res.status(200).json(rentingGames);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error.message });
    }
  }

  static async listGames(req, res) {
    try {
      const gamesList = await RentingGamesService.listGames({
        ...req.query,
        userId: req.userId,
      });
      res.status(200).json(gamesList);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error.message });
    }
  }

  static async getRentingGameById(req, res) {
    try {
      const rentingGame = await RentingGamesService.getRentingGameById(
        req.params.id
      );
      res.status(200).json(rentingGame);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error.message });
    }
  }

  static async getBestGameRenting(req, res) {
    const params = {
      gameId: req.params.id,
      userId: req.query.userId,
    };
    try {
      const bestRentingGames = await RentingGamesService.getBestGameRenting(
        params
      );
      res.status(200).json(bestRentingGames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
