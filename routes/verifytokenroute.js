const express = require("express");
const route = express.Router();
const pool = require("../db");
const {
  refreshToken,
  validateToken,getUser
} = require("../middlewares/AuthMiddleWare");
route.get("/refresh", refreshToken, validateToken,getUser);
module.exports = route;
