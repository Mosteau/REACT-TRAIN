// Load the express module to create a web application

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json())

const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // keep this one, after checking the value in `backend/.env`
      "http://mysite.com",
      "http://another-domain.com",
    ],
  })
);

app.use(express.static("./public"));

app.use("/images", express.static(path.join(__dirname, "images")));


// Import the API routes from the router module
const router = require("./router");

app.use("/images", express.static("images"));

// Mount the API routes under the "/api" endpoint
app.use("/api", router);


app.use(express.static("./public/"));

// Permettre au refresh de fonctionner sur REACT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const errorManager = require("./services/errorManager");

app.use(errorManager);

module.exports = app;