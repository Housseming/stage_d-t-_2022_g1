const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json());
const cors = require("cors");
const pool = require("./db")
const session = require('express-session')
//middleware
app.use(cors());
app.use(express.json());
//RouTES
//create a todo 
app.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const id = username + password

        const newTodo = await pool.query("INSERT INTO registration (id,username,password,email) VALUES($1,$2,$3,$4 )",
            [id, username, password, email]);
        res.json(newTodo);


    }
    catch (err) {
        console.error(err.message);
    }
});
//PASSPORT

app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    console.log(`Username: ${username} Password: ${password}`);
    pool.query('SELECT * FROM registration WHERE username=$1 AND password=$2',
    [username, password], (err, result) => {
        if (err) {
            throw(err);
        }
        else
            console.log(result.rows[0].id);
    }); 

});
app.listen(5000, () => {
        console.log("running server on 5000");
    }) 