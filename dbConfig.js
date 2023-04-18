require('dotenv').config();
const {Client} = require('pg');
const {Pool} = require('pg');
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    //ssl:  {rejectUnauthorized: false}
});
console.log(connectionString);

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect();

module.exports = { pool };