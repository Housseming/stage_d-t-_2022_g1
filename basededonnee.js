const Client = require("pg").Client;

const client = new Client({
    user: "postgres",
    password: "password12345",
    host: "localhost",
    port: 5432,
    database: "Avocat",
});

client.connect(function(err) {
    if (err) throw (err);
    console.log("Connected!");
});

module.exports = client;