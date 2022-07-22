//****************************************************** */
const bodyParser = require("body-parser");
const root8 = require("./routes/primehuissier");
const root9 = require("./routes/primehuissier");
const express = require("express");
const app = express();
app.use(bodyParser.json());
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(root8); //primehuissier


app.listen(5000, () => {
    console.log("running server on 5000");
});