const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const bodyParser = require("body-parser");
const { validateToken } = require("../middlewares/AuthMiddleWare");

route.post("/Home", validateToken, (req, res) => {
  res.json({ error: "user logged in !" });
});

module.exports = route;
