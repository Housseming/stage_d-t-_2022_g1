const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const bodyParser = require("body-parser");
const { validateToken } = require("../middlewares/AuthMiddleWare");
route.post("/ajouterTribunale", (req, res) => {
    const {lieu } = req.body;
    client.query(
        "INSERT INTO tribunaletable (lieu) VALUES($1)", [lieu],
        (error, result) => {
            if (error) {
                console.log(error.message);
            } else {
                res.send("success");
            }
        }
    );
});

route.post("/deleteTribunale", (req, res) => {
    const { id } = req.body;
    client.query(
        "DELETE FROM tribunaletable WHERE id=$1", [id],
        (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json("tribunale supprimée");
            }
        }
    );
});

route.post("/modifierTribunale", (req, res) => {
    const { id,lieu } = req.body;
    client.query(
        "UPDATE tribunaletable SET lieu=$1 WHERE id=$2", [lieu,id],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.json("tribunale modifiée");
            }
        }
    );
});

route.get("/tribunale", (req, res) => {
    client.query("SELECT * FROM tribunaletable", (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.json(result.rows);
        }
    });
});

//services
route.get("/service", (req, res) => {
  client.query("SELECT * FROM servicetable", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.json(result.rows);
    }
  });
});
route.post("/serviceadd", (req, res) => {
    const { nom, service_id,lundi,mardi,mercredi,jeudi,vendredi,samedi } = req.body;
    client.query(
        "INSERT INTO servicetable (nom,service_id,lundi,mardi,mercredi,jeudi,vendredi,samedi) VALUES($1,$2,$3,$4,$5,$6,$7,$8)", [nom, service_id,lundi,mardi,mercredi,jeudi,vendredi,samedi],
        (error, result) => {
            if (error) {
                console.log(error.message);
            } else {
                res.send("success");
            }
        }
    );
});

route.post("/serviceeff", (req, res) => {
    const { id } = req.body;
    client.query(
        "DELETE FROM servicetable WHERE service_id=$1", [id],
        (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json("service supprimée");
            }
        }
    );
});

route.post("/service/update", (req, res) => {
    const {id, nom,lundi,mardi,mercredi,jeudi,vendredi,samedi } = req.body;
    client.query(
        "UPDATE servicetable SET nom=$1,lundi=$2,mardi=$3,mercredi=$4,jeudi=$5,vendredi=$6,samedi=$7 WHERE service_id=$8 ", [nom,lundi,mardi,mercredi,jeudi,vendredi,samedi,id],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.json("service modifiée");
            }
        }
    );
});

route.get("/tribunale", (req, res) => {
    client.query("SELECT * FROM tribunaletable", (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.json(result.rows);
        }
    });
});

module.exports = route;