const pg = require('pg');

let connectionPool = null;

const createPool = (dbConfig) => {

    if (connectionPool) return;

    connectionPool = new pg.Pool(dbConfig);

    connectionPool.on('error', (err, client) => {
        client.close();
        process.exit(1);
    });
};

const getPool = () => {
    return connectionPool;
};

const executeFunction = (query, queryParams) => {
    return getPool().connect()
        .then((client) => {
            return client.query(query, queryParams)
                .then((results) => {
                    client.release();
                    return results.rows;
                })
                .catch((err) => {
                    client.release();
                    return Promise.reject(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    createPool,
    getPool,
    executeFunction,
};