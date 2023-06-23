import db from "../../config/db.config.js";
import { initModels } from "../../database/models/init-models.js";

export async function loadSequelizeModels(req) {
  initModels(db.sequelize);
  await db.sequelize.sync();
}
