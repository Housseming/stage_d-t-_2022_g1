const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const pool = require("../db");
require("dotenv").config();
//bch nasnaa token

const { validateToken } = require("../middlewares/AuthMiddleWare");
route.use(cookie());
var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;
var keyrefreshtoken = process.env.REFRESH_TOKEN_SECRET;
route.post("/login", (req, res) => {
            const { username, password } = req.body;
            pool.query(
                    "SELECT * FROM clienttable WHERE username=$1", [username],
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
                id: result.rows[0].id 
              },
              keyaccesstoken,
              { expiresIn: "35s" }
            );
            console.log("token generated after logging in",accessToken);
            //payload heya data nheb ena nkhazenha eli heya parametre lowel mtaa el sign
            if (req.cookies[`${result.rows[0].id}`]) {//check if the cookie amready exists then generate a new one
              req.cookies[`${result.rows[0].id}`] = "";
            }
            

            res.cookie(String(result.rows[0].id), accessToken, {
              path: "/",
              expires: new Date(Date.now() + 1000 * 30),
              httpOnly: true,
              sameSite: "lax",
              secure:"true",
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



module.exports = route;