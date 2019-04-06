// @flow
import { gql } from 'apollo-server/';

const typeDefs = [gql`
  extend type Query {
    teams: JSON  
  }
`];

export const resolvers = {
  Query: {
    teams: (_, __, { client }) => client.reporting.teams.find({}, { limit: 15 }),
  },
};

export default {
  typeDefs,
  resolvers,
};
