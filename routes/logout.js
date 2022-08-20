const express = require("express");
const route = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
const {
  validateToken,
  getUser,
  refreshToken,
  logout,
} = require("../middlewares/AuthMiddleWare");
route.get("/logout",validateToken,logout);

module.exports = route;
