/*const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const client = require("../basededonnee");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();
//bch nasnaa token

const { validateToken } = require("../middlewares/AuthMiddleWare");
route.use(cookie());
var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;
var keyrefreshtoken = process.env.REFRESH_TOKEN_SECRET;
route.post("/login", (req, res) => {
  const { username, password } = req.body;
  client.query(
    "SELECT * FROM clienttable WHERE username=$1",
    [username],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length > 0) {
        console.log(result.rows[0]);

        bcrypt.compare(password, result.rows[0].password, (error, match) => {
          console.log(match);

          if (match) {
            console.log("matching");

            const accessToken = jwt.sign(
              {
                username: result.rows[0].username,
                id: result.rows[0]
                  .id /*,iss:esm el site(createur de jeton) ou bien t7otha issuer fel options,
              },
              keyaccesstoken,
              { expiresIn: "1h" }
            );
            //payload heya data nheb ena nkhazenha eli heya parametre lowel mtaa el sign

            res.cookie(String(result.rows[0].username), accessToken, {
              path: "/",
              expires: new Date(Date.now() + 1000 * 30),
              httpOnly: true,
              sameSite: "lax",
            });
            res.json({ message: "Successufully logged in", accessToken });
          } else {
            res.json({ error: "mot de passe incorrecte" });
          }
        });
      } else {
        res.json({ error: " cet utilisateur n'existe pas " });
      }
    }
  );
});

route.post("/", (req, res) => {
  client.query("SELECT * FROM clienttable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
    }
  });
});

module.exports = route;*/