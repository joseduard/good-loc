// app.js
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const express = require("express");

const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
//log resquest & responses with dev function
app.use(morgan("dev"));

app.use(helmet()); // Sécurization of Express with define Http header
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("An error occurred");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Static management of the image resource
// Midleware that allows to load files that are in the images directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// routes
const authRoutes = require("./routes/authRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const gamesRoutes = require("./routes/gamesRoutes.js");
const rentingGamesRoutes = require("./routes/rentingGamesRoutes.js");
const rentingRoutes = require("./routes/rentsRoutes.js");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/account/message/", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/", gamesRoutes);
app.use("/api/", rentingGamesRoutes);
app.use("/api/", rentingRoutes);
module.exports = app;
