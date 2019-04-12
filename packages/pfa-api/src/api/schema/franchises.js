// @flow
import { gql } from 'apollo-server';
import * as R_ from 'ramda-extension';

const typeDefs = [gql`
  type Franchise {
    idFranchise : String!
    idStadium   : String
    teamFull    : String!
    teamAbbr    : String!
    mascot      : String!
    stadiumName : String
    activeFrom  : Int!
    activeTo    : Int!
    isActive    : Boolean!
  }

  extend type Query {
    franchises: [Franchise]!
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
