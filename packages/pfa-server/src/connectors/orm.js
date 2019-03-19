import knex from 'knex';
import bookshelf from 'bookshelf';

export default (app) => {
  const { client, connection } = app.get('postgres');
  const db = knex({ client, connection });
  const orm = bookshelf(db)
    .plugin('registry')
    .plugin('case-converter');

  app.set('orm', orm);

  return app;
};
