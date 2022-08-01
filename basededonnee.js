const Client = require("pg").Client;

const client = new Client({
    user: "postgres",
    password: "*itsme*",
    host: "localhost",
    port: 5432,
    database: "primehuissier",
});

client.connect(function(err) {
    if (err) throw (err);
    console.log("Connected!");
});

module.exports = client;