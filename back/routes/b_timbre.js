const bodyParser = require("body-parser");

const express = require("express");
const root3 = express.Router();


const cors = require("cors");
const pool = require("../db")




//RouTES
//create a todo 
root3.post("/timbre", async (req, res) => {
    try {
        const { libelle,montant } = req.body;
       

        const newTodo2 = await pool.query(" INSERT INTO public.timbre (libelle,montant) VALUES ($1, $2)  ",
            [ libelle,montant ]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
//pour la modification 
root3.post("/timbre/modif", async (req, res) => {
    try {
        const { libelle,montant } = req.body;
       

        const newTodo1 = await pool.query("UPDATE timbre SET montant=$2 WHERE libelle=$1",
            [libelle,montant]);
        res.json(newTodo1);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
});
root3.get("/timbre", async (req, res) => {
    try {

        const newTodo = await pool.query("SELECT * FROM timbre")
        res.json(newTodo.rows);
        

    }
    catch (err) {
        console.error(err.message);
    }
});

module.exports=root3;