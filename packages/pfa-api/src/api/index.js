// @flow
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import massive from 'massive';
import schema from './schema';

export default () => {
  const db$ = Rx.from(massive({
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DB_NAME || 'postgres',
    user: process.env.PG_DB_USER || 'postgres',
    poolSize: 5,
  }));
  const app$ = Rx.of(express());
  const serverFxty$ = Rx.of(context => new ApolloServer({ schema, context }));

  return Rx.forkJoin(db$, app$, serverFxty$)
    .pipe(
      RxOp.mergeMap(([_db, _app, _serverFxty]) => {
        _serverFxty({ client: _db }).applyMiddleware({ app: _app });
        return Rx.of(_app);
      }),
    );
};
