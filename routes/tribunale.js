const express = require("express");
const route = express.Router();
const client = require("../basededonnee");
const bodyParser = require("body-parser");
const { validateToken } = require("../middlewares/AuthMiddleWare");
route.post("/ajouterTribunale", (req, res) => {
    const { lieu } = req.body;
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
    const { lieu } = req.body;
    client.query(
        "DELETE FROM tribunaletable WHERE lieu=$1", [lieu],
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
    const { lieu } = req.body;
    client.query(
        "UPDATE tribunaletable SET lieu=$1 ", [lieu],
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
    const { nom, tribunale_id } = req.body;
    client.query(
        "INSERT INTO servicetable (nom,tribunale_id) VALUES($1,$2)", [nom, tribunale_id],
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
    const { lieu } = req.body;
    client.query(
        "DELETE FROM tribunaletable WHERE lieu=$1", [lieu],
        (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json("tribunale supprimée");
            }
        }
    );
});

route.post("/service/update", (req, res) => {
    const { lieu } = req.body;
    client.query(
        "UPDATE tribunaletable SET lieu=$1 ", [lieu],
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

module.exports = route;