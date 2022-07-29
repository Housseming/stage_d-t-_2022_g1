const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");
const cookie = require("cookie-parser");
require("dotenv").config();
const client = require("../basededonnee");
const { query } = require("express");
var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;
//bch naadiw el token mel front a travers el header mais fama des methodes okhrin

//validateToken
const validateToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const accessToken = cookies.split("=")[1]; //traja3 el token
  console.log(cookies);
  console.log(accessToken);
  if (!accessToken) {
    //idha marajanech el acesstoken
    return res.json({ error: "utilisateur non connecté" });
  } else {
    const validToken = jwt.verify(String(accessToken), keyaccesstoken);
    if (validToken) {
      console.log("token verifyed");
      next();
    } else {
      res.json({ message: "invalid token" });
    }
  }
};

//refreshToken
const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "couldn't find token" });
  }
  jwt.verify(String(prevToken), keyaccesstoken, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "authentification failed" });
    } else {
      console.log("refresh user");
      console.log(user);
      res.clearCookie(`${user.username}`);
      req.cookies[`${user.username}`] = "";
      const token = jwt.sign(
        {
          username: user.username,
          id: user.id
        },
        keyaccesstoken,
        { expiresIn: "30s" }
      );
      res.cookie(String(user.username), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax",
      });
      req.username = user.username;
      next();
    }
  });
};
//getUser
const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await client.query("SELECT * FROM clienttable WHERE id=$1",[id])
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ user });
};

module.exports = { validateToken, refreshToken , getUser };
