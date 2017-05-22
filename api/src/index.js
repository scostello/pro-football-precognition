const router = require('express').Router();
const api = require('./api');
const db = require('./db');

const dbConfig = {
    user              : 'precog',              // env var: PGUSER
    database          : 'pro_football_precog', // env var: PGDATABASE
    password          : '<redacted>',          // env var: PGPASSWORD
    host              : 'localhost',           // Server hosting the postgres database
    port              : 5432,                  // env var: PGPORT
    max               : 10,                    // max number of clients in the pool
    idleTimeoutMillis : 30000,
};

module.exports = (app) => {

    db.createPool(dbConfig);
    api.registerRoutes(app);

    app.use('/v1', router);

};