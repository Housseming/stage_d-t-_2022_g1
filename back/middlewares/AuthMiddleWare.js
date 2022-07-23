const jwt = require("jsonwebtoken");
require('dotenv').config()
var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;
//bch naadiw el token mel front a travers el header mais fama des methodes okhrin
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken"); //key
  if (!accessToken) {
    //idha marajanech el acesstoken
    return res.json({ error: "utilisateur non connecté" });
  } else {
    const validToken = jwt.verify(accessToken,keyaccesstoken);
    if (validToken) {
      next();
    }
  }
};
module.exports = { validateToken };
