import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from './schema';

export default (app) => {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    app.use('/graphql', graphqlExpress(req => ({
        schema,
    })));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));
};