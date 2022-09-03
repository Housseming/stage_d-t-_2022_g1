//****************************************************** */
const bodyParser = require("body-parser");
const root1 = require("./routes/b_parametreglobale");
const root2 = require("./routes/b_honoraireenextra");
const root3 = require("./routes/b_timbre");
const root4 = require("./routes/b_photocopie");
const root5 = require("./routes/b_transport");
const root6 = require("./routes/b_recettedufinance");
const root7 = require("./routes/b_emplacementdossier");
const root8 = require("./routes/primehuissier");
const root9 = require("./routes/utilisateur");
const root10 = require("./routes/b_Gestion");
const root11 = require("./routes/recherchedossier");
const root12 = require("./routes/adversaire");
const root13 = require("./routes/tache");
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
const loginroute = require("./routes/RouteLogin");
const registerroute = require("./routes/RouteRegister");
const collabroute = require("./routes/RouteCollab");
const typedossierroute = require("./routes/typedossier")
//const homeroute = require("./routes/RouteHome");
const tribunaleroute = require("./routes/tribunale");
const cookie = require("cookie-parser");
//const verifyroute = require("./routes/verifytokenroute");
//const user = require("./routes/user");
//const logout = require("./routes/logout");
//const verifyroute = require("./routes/verifytokenroute")
require("dotenv").config();

app.use(cookie());
//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);
/*app.use(express.static(path.join(__dirname, "front/build")));
if (process.env.NODE_ENV === "production") {
    //server static content
    app.use(express.static(path.join(__dirname, "front/build")));
    //app.get("*", (req, res) => {
    // req.sendFile(path.resolve(__dirname, "front/build", "index.html"));

}
console.log(__dirname);
console.log(path.join(__dirname, "front/build"));*/

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
app.use(root11); //recherchedossier
app.use(root12); //adversaire
app.use(root13); //tache
//app.use(verifyroute);
app.use(loginroute);
app.use(registerroute);
app.use(collabroute);
//app.use(homeroute);
//app.use(user);
app.use(tribunaleroute);
app.use(typedossierroute);
//app.use(logout);

/*app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build/index.html"));
})*/
app.listen(PORT, () => {
  console.log(`running server on ${PORT}`);
});
