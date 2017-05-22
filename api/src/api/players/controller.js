const {executeFunction} = require('../../db');

const _handleSuccess = (res) => (results) =>  res.json(results);
const _handleError = (res) => (err) =>  res.status(404).json({error: 'There was an issue while executing the provided query.'});

const all = (req, res) => {
    const query = `SELECT * FROM reporting.players_all()`;

    executeFunction(query, [])
        .then(_handleSuccess(res))
        .catch(_handleError(res));
};

module.exports = {
    all,
};