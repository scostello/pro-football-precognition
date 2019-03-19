import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from './schema';
import createModels from './models';

export default (app) => {
  const {
    teams,
  } = createModels(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use('/graphql', graphqlExpress(() => ({
    schema,
    context: {
      teams,
    },
  })));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
};
