const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
};
const proConfig = {
    connectionString: process.env.DATABASE_URL //jeya ml heroku addons

}
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);
pool.connect(function(err) {
    if (err) { throw (err) };
    console.log("Connected!");
});

module.exports = pool;