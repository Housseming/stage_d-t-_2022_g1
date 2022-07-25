const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");
const cookie = require("cookie-parser");
require("dotenv").config();
var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;
//bch naadiw el token mel front a travers el header mais fama des methodes okhrin
const validateToken = (req, res, next) => {
  //const headers = req.headers[`authorization`]; //key
  //const accessToken = headers.split(" ")[1];
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
      res.clearCookie(`${user.username}`);
      req.cookies[`${user.username}`] = "";
      const token = jwt.sign({});
    }
  });
};
module.exports = { validateToken };
