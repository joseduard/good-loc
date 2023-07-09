import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class CategoriesRepository {
  static findAll = withErrorHandling(async () => {
    const { categories } = models;
    return categories.findAll({
      limit: 200,
    });
  });
  static findById = withErrorHandling(async (id) => {
    const { categories } = models;
    return categories.findByPk(id, {
      attributes: ['id', 'name'],
    });
  });
}
