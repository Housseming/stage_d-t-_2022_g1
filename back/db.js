//file hedha lel connexion avec data base
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "*itsme*",
    host: "localhost",
    port: 5432,
    database: "primehuissier"
});
pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = pool;