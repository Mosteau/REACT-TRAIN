// Charger le module express pour créer une application web

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json())

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.static("./public"));

app.use("/images", express.static(path.join(__dirname, "images")));


// Importer les routes API depuis le module router
const router = require("./router");

app.use("/images", express.static("images"));

// Monter les routes API sous le point de terminaison "/api"
app.use("/api", router);


app.use(express.static("./public/"));

// Permettre au refresh de fonctionner sur REACT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const errorManager = require("./services/errorManager");

app.use(errorManager);

module.exports = app;