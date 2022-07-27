const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const {
  refreshToken,
  validateToken,
} = require("../middlewares/AuthMiddleWare");
route.get("/refresh", refreshToken, validateToken);
module.exports = route;
