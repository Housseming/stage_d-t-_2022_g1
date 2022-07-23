//****************************************************** */
const bodyParser = require("body-parser");
const root1 = require("./routes/b_parametreglobale")
const root2 = require("./routes/b_honoraireenextra")
const root3 = require("./routes/b_timbre")
const root4 = require("./routes/b_photocopie")
const root5 = require("./routes/b_transport")
const root6 = require("./routes/b_recettedufinance")
const root7 = require("./routes/b_emplacementdossier")
const root8 = require("./routes/primehuissier");
const root9 = require("./routes/utilisateur")
const root10 = require("./routes/b_Gestion")
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const loginroute = require("./routes/RouteLogin");
const registerroute = require("./routes/RouteRegister");
const collabroute = require("./routes/RouteCollab");
const homeroute = require("./routes/RouteHome");
const tribunaleroute = require("./routes/tribunale");
require('dotenv').config();
const PORT = process.env.PORT || 5000
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(root1); //parametreglobale
app.use(root2); //honoraireenextra
app.use(root3); //timbre
app.use(root4); //photocopie
app.use(root5); //transport
app.use(root6); //recettedufinance
app.use(root7); //emplacementdossier
app.use(root8); //primehuissier
app.use(root9); //utilisateur
app.use(root10); //gestionclient



app.use(loginroute);
app.use(registerroute);
app.use(collabroute);
app.use(homeroute);
app.use(tribunaleroute);

app.listen(PORT, () => {
  console.log("running server on 5000");
});
