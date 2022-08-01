const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const bodyParser = require("body-parser");
const {
  validateToken,
  getUser,
  refreshToken,
  logout,
} = require("../middlewares/AuthMiddleWare");
route.get("/logout",validateToken,logout);

module.exports = route;
