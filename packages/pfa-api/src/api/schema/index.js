// @flow
import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server';
import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import players from './players';
import franchises from './franchises';

const rootSchema = gql`
  scalar JSON
  
  # Base Query type we'll use to extend in the other modules
  type Query {
    _ : Boolean
  }
`;

const rootResolvers = {
  JSON: GraphQLJSON,
  Query: {
    _: () => true,
  },
};

const typeDefs = [
  rootSchema,
  ...players.typeDefs,
  ...franchises.typeDefs,
];

const resolvers = merge(
  rootResolvers,
  players.resolvers,
  franchises.resolvers,
);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
