const bodyParser = require("body-parser");
const express = require("express");
const root10 = express.Router();
const cors = require("cors");
const pool = require("../db")

//RouTES
// pour l'ajout
root10.post("/gestionclient", async (req, res) => {
    try {
        const { id,id_francais,montant } = req.body;
       

        const newTodo2 = await pool.query(" INSERT INTO public.gestionclient (id, id_francais,montant) VALUES ($1, $2,$3) ON CONFLICT (id) DO UPDATE SET id_francais =$2, montant=$3 ",
            [ id,id_francais,montant ]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
//pour la modification 
root10.post("/gestionclient/modif", async (req, res) => {
    try {
        const { id,montant } = req.body;
       

        const newTodo2 = await pool.query("UPDATE gestionclient SET montant=$2 WHERE id=$1  ",
            [id,montant]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
//selection 
root10.get("/gestionclient", async (req, res) => {
    try {
        const newTodo = await pool.query(" SELECT * FROM gestionclient")
        res.json(newTodo.rows);
        

    }
    catch (err) {
        console.error(err.message);
    }
 // pour la suppression
 root10.post("/gestionclient/delete", async (req, res) => {
    try {
        const { id } = req.body;
       const newTodo1 = await pool.query(" DELETE FROM public.gestionclient WHERE id=$1",
            [id]);
        res.json(newTodo1);
        res.json("honoraire was deleted");
        

    }
    catch (err) {
        console.error(err.message);
    }
});

});

module.exports=root10;
