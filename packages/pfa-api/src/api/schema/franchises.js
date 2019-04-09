// @flow
import { gql } from 'apollo-server';

const typeDefs = [gql`
  extend type Query {
    franchises: JSON  
  }
`];

export const resolvers = {
  Query: {
    franchises: (_, __, { client }) => client.reporting.franchises_materialized.find({}, { limit: 15 }),
  },
};

export default {
  typeDefs,
  resolvers,
};
