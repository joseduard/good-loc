import models from '../../database/models/init-models.js';

export class RentingGamesRepository {
  static rentingGames = models.rentingOrBuyingGames;
  static findOne = async (gameId, ownerId) => {
    return this.rentingGames.findOne({
      where: {
        game_id: gameId,
        owner_id: ownerId,
      },
    });
  };
}
