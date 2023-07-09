import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class CategoriesRepository {
  static findAll = withErrorHandling(async () => {
    const { categories } = models;
    return categories.findAll({
      limit: 200,
    });
  });
}
