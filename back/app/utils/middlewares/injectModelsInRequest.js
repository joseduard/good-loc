import { initModels } from '../../database/models/init-models.js';
import db from '../../config/db.config.js';

export async function injectModelsInRequest(req, res, next) {
  req['models'] = await initModels(db.sequelize);
  next();
}
