import { loadSequelizeModels } from "./app/utils/helpers/sequelizeHelpers.js";
import { config } from "./app/config/app.config.js";
import app from "./app/app.js";
async function startServer() {
  await loadSequelizeModels();

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}.`);
  });
}

await startServer();
