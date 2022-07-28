const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const bodyParser = require("body-parser");
const { validateToken, getUser } = require("../middlewares/AuthMiddleWare");
route.get("/user", validateToken);

module.exports = route;
