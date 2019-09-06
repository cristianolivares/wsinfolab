const pg = require('pg');
const express = require('express');
const app = express();
var usuario = "";

const config = {
    user: 'postgres',
    database: 'ruido',
    password: 'Orange',
    port: 5432
};

const pool = new pg.Pool(config);
pool.connect(function (err, client, done) {

    if (err) throw err;
    console.log('Conexion exitosa al PostgreSQL');

});

module.exports = pool;