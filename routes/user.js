const express = require("express");
const route = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
const { validateToken, getUser,refreshToken} = require("../middlewares/AuthMiddleWare");
route.get("/user",validateToken,getUser);

module.exports = route;
