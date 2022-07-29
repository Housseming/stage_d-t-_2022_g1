const bodyParser = require("body-parser");
const express = require("express");
const root10 = express.Router();
const cors = require("cors");
const pool = require("../db")

//RouTES
// pour l'ajout
root10.post("/gestionclient", async(req, res) => {
    try {
        const { id, raison, matricule, ville, rue, num, code_postale, activité, situation_fiscale, categorie, fax, email } = req.body;


        const newTodo2 = await pool.query("INSERT INTO gestionclient (id,raison,matricule,ville,rue,num,code_postale,activité,situation_fiscale,categorie,fax,email) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)  ", //nahit on conflict khater ken yajouti meme id maykblsh haka wala haka
            [id, raison, matricule, ville, rue, num, code_postale, activité, situation_fiscale, categorie, fax, email]);
        res.json(newTodo2);


    } catch (err) {
        console.error(err.message);
    }
});
//pour la modification 
root10.post("/gestionclient/modif", async(req, res) => {
    try {
        const { id, raison, matricule, ville, rue, num, code_postale, activité, situation_fiscale, categorie, fax, email } = req.body;

        const newTodo2 = await pool.query("UPDATE gestionclient SET raison=$2,matricule=$3,ville=$4,rue=$5,num=$6,code_postale=$7,activité=$8,situation_fiscale=$9,categorie=$10,fax=$11,email=$12   WHERE id=$1  ", [id, raison, matricule, ville, rue, num, code_postale, activité, situation_fiscale, categorie, fax, email]);
        res.json(newTodo2);


    } catch (err) {
        console.error(err.message);
    }
});
//selection 
root10.get("/gestionclient", async(req, res) => {
    try {
        const newTodo = await pool.query(" SELECT * FROM gestionclient ORDER by id asc")
        res.json(newTodo.rows);


    } catch (err) {
        console.error(err.message);
    }
    // pour la suppression
    root10.post("/gestionclient/delete", async(req, res) => {
        try {
            const { id } = req.body;
            const newTodo1 = await pool.query(" DELETE FROM gestionclient WHERE id=$1", [id]);
            res.json(newTodo1);
            res.json("CLIENt was deleted");


        } catch (err) {
            console.error(err.message);
        }
    });

});

module.exports = root10;