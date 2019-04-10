// @flow
import { gql } from 'apollo-server';
import * as R_ from 'ramda-extension';

const typeDefs = [gql`
  extend type Query {
    franchises: JSON  
  }
`];

export const resolvers = {
  Query: {
    franchises: (_, __, { client }) => client
      .reporting
      .franchises_materialized
      .find({
        is_active: true,
      })
      .then(franchises => franchises.map(R_.camelizeKeys)),
  },
};

export default {
  typeDefs,
  resolvers,
};
