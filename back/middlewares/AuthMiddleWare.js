const jwt = require("jsonwebtoken");
//bch naadiw el token mel front a travers el header mais fama des methodes okhrin
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken"); //key
  if (!accessToken) {
    //idha marajanech el acesstoken
    return res.json({ error: "utilisateur non connecté" });
  } else {
    const validToken = jwt.verify(accessToken, "secretkeyaccesstoken");
    if (validToken) {
      next();
    }
  }
};
module.exports = { validateToken };
