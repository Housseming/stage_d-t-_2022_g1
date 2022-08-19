const bodyParser = require("body-parser");
const express = require("express");
const root13 = express.Router();
const cors = require("cors");
const pool = require("../db");

//middleware

//routes//
//create adversaire
//req heya requete client res heya res li bch ymchi lclient
//async taati wa9t lel data bch tekhdem les fctions teeha
root13.post("/tacheadd", async(req, res) => {
    try {
        const {
            tache,
            date_critique,
            date_rappel,
            resolu,
            personne_chargee,
            greffier,
            course,
            lieux,
            services,
            date_audience,
            date_decheance,
            id_doss,
        } = req.body;
        const newtache = await pool.query(
            "INSERT INTO tachetable (tache, date_critique, date_rappel, resolu, personne_chargee,greffier,course,lieux,services,date_audience,date_decheance,id_doss) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", [
                tache,
                date_critique,
                date_rappel,
                resolu,
                personne_chargee,
                greffier,
                course,
                lieux,
                services,
                date_audience,
                date_decheance,
                id_doss,
            ]
            //res.json("succes"),
        );
        res.json(newadversaires.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//get all adversaires
root13.get("/tache", async(req, res) => {
    try {
        const alladversaires = await pool.query("SELECT * FROM tachetable");
        res.json(alladversaires.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get a adversaire
root13.get("/tache/:id", async(req, res) => {
    try {
        const { id_tache } = req.params;
        const adversaire = await pool.query(
            "SELECT * FROM tachetable WHERE id_tache=$1", [id_tache]
        );
        res.json(adversaire.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update a adversaire
root13.post("/tache/update", async(req, res) => {
    try {
        const { id_tache } = req.body;
        const {
            tache,
            date_critique,
            date_rappel,
            resolu,
            personne_chargee,
            greffier,
            course,
            lieux,
            services,
            date_audience,
            date_decheance,
            id_doss,
        } = req.body;
        const updatePrime = await pool.query(
            "UPDATE tachetable SET tache=$1,date_critique=$2,date_rappel=$3,resolu=$4,personne_chargee=$5,greffier=$6,course=$7,lieux=$8,services=$9,date_audience=$10,date_decheance=$11,id_doss=$12 WHERE id_tache=$13", [
                tache,
                date_critique,
                date_rappel,
                resolu,
                personne_chargee,
                greffier,
                course,
                lieux,
                services,
                date_audience,
                date_decheance,
                id_doss,
                id_tache
            ]
        );
        res.json("adversaire updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete  adversaire
root13.post("/tacheeff", async(req, res) => {
    try {
        const { id_tache } = req.body;
        const deletePrime = await pool.query(
            "DELETE FROM tachetable WHERE id_tache=$1", [id_tache]
        );
        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = root13;