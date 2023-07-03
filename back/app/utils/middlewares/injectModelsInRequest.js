import { loadSequelizeModels } from '../helpers/sequelizeHelpers.js';

export async function injectModelsInRequest(req, res, next) {
  req['models'] = await loadSequelizeModels();
  next();
}
