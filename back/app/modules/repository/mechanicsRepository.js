import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class MechanicsRepository {
  static findAllMechanics = withErrorHandling(async () => {
    const { mechanicsType } = models;
    return mechanicsType.findAll({ limit: 200 });
  });
}
