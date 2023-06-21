// server.js
const app = require("./app.js"); // Import the app setup from app.js
const { loadSequelizeModels } = require("./helpers/sequelizeHelpers.js");

loadSequelizeModels();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
