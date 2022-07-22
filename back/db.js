const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password12345",
  host: "localhost",
  port: 5432,
  database: "Avocat"
});

module.exports = pool;