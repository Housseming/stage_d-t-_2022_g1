const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
route.post("/register", (req, res) => {
  //recevoir les données du front end
  const { username, password, email } = req.body;
  //verifier si l'utilisateur existe deja ou non si non ajouter ses données dans la base 
  client.query("SELECT * FROM clienttable WHERE (username=$1 AND email=$2) ",[username,email],(error,result)=>{
    if(error){
      throw(error);
    }
    else{
      if(result.rows.length>0){
        res.json({error:"ce compte deja existe "})
      }
      else{
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            throw err;
          }
          client.query(
            "INSERT INTO clienttable (username,password,email) VALUES($1,$2,$3)",
            [username, hash, email],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                res.json("SUCCESS"); //renvoi sucess au client
              }
            }
          );
        });

      }

    }
  })
  
});

module.exports = route;
