const bodyParser = require("body-parser");
const express = require("express");
const root2 = express.Router();
const cors = require("cors");
const pool = require("../db")

//RouTES
// pour l'ajout
root2.post("/honoraireenextra", async (req, res) => {
    try {
        const { libelle,libelle_francais,montant } = req.body;
       

        const newTodo2 = await pool.query("INSERT INTO public.honoraireenextra (libelle, libelle_francais,montant) VALUES ($1, $2,$3) ON CONFLICT (libelle) DO UPDATE SET libelle_francais =$2, montant=$3 ",
            [ libelle,libelle_francais,montant ]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
//pour la modification 
root2.post("/honoraireenextra/modif", async (req, res) => {
    try {
        const { libelle,montant } = req.body;
       

        const newTodo2 = await pool.query("UPDATE honoraireenextra SET montant=$2 WHERE libelle=$1  ",
            [libelle,montant]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
//selection 
root2.get("/honoraireenextra", async (req, res) => {
    try {
        const newTodo = await pool.query(" SELECT * FROM honoraireenextra")
        res.json(newTodo.rows);
        

    }
    catch (err) {
        console.error(err.message);
    }
 // pour la suppression
 root2.post("/honoraireenextra/delete", async (req, res) => {
    try {
        const { libelle } = req.body;
       const newTodo1 = await pool.query(" DELETE FROM public.honoraireenextra WHERE libelle=$1",
            [libelle]);
        res.json(newTodo1);
        res.json("honoraire was deleted");
        

    }
    catch (err) {
        console.error(err.message);
    }
});

});

module.exports=root2;
