const bodyParser = require("body-parser");
const express = require("express");
const root11 = express.Router();
const cors = require("cors");
const pool = require("../db");

//mid_dossierdleware

//routes//
//create dossier
root11.post("/recherchedossieradd", async(req, res) => {
    try {
        const { num_affaire, emplacement, client, tel, mission, adversaire, reste } = req.body;
        const newdossiers = await pool.query(
            "INSERT INTO dossierhuissier (num_affaire, emplacement, client, tel, mission,adversaire,reste) VALUES($1,$2,$3,$4,$5,$6,$7)", [num_affaire, emplacement, client, tel, mission, adversaire, reste]
            //res.json("succes"),
        );
        res.json(newdossiers.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//get all dossiers
root11.get("/recherchedossier", async(req, res) => {
    try {
        const alldossiers = await pool.query("SELECT * FROM recherchedossier");
        res.json(alldossiers.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get a dossier
root11.get("/recherchedossier/:id_dossier", async(req, res) => {
    try {
        const { id_dossier } = req.params;
        const dossier = await pool.query("SELECT * FROM dossierhuissier WHERE id_dossier=$1", [
            id_dossier,
        ]);
        res.json(dossier.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update a dossier
root11.post("/recherchedossier/update", async(req, res) => {
    try {
        const { id_dossier } = req.body;
        const { num_affaire, emplacement, client, tel, mission } = req.body;
        const updatedossier = await pool.query(
            "UPDATE dossierhuissier SET num_affaire=$1,emplacement=$2,client=$3,tel=$4,mission=$5,adversaire=$6,reste=$7 WHERE id_dossier=$8", [num_affaire, emplacement, client, tel, mission, adversaire, reste, id_dossier]
        );
        res.json("dossier updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a dossier
root11.post("/recherchedossiereff", async(req, res) => {
    try {
        const { id_dossier } = req.body;
        const deletedossier = await pool.query(
            "DELETE FROM recherchedossier WHERE id_dossier=$1", [id_dossier]
        );
        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = root11;