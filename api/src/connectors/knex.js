import knex from 'knex';

export default (app) => {
    const { client, connection } = app.get('postgres');
    const db = knex({ client, connection });

    app.set('knexClient', db);

    return app;
};