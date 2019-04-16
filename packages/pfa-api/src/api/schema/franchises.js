// @flow
import { gql } from 'apollo-server';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';

const FranchiseSchema = gql`
  type Franchise {
    idFranchise       : String!
    teamFull          : String!
    teamAbbr          : String!
    mascot            : String!
    stadiumName       : String
    activeFrom        : Int!
    activeTo          : Int!
    isActive          : Boolean! 
  }
  
  type FranchiseConnection {
    cursor : String!
    nodes  : [Franchise]!
  }

  enum FranchiseOrderField {
    CREATED_AT
    NAME
    YEAR_FOUNDED
  }

  input FranchiseOrder {
    direction : OrderDirection!
    field     : FranchiseOrderField! 
  }

  extend type Query {
    franchises(
      cursor  : String
      first   : Int
      orderBy : FranchiseOrder 
    ): FranchiseConnection
  }
`;

const typeDefs = [FranchiseSchema];

const fieldsMap = {
  CREATED_AT: 'id_franchise',
  NAME: 'team_abbr',
  YEAR_FOUNDED: 'active_from',
};

const buildQueryOpts = ({ cursor, first = 50, orderBy }) => {
  const orderField = {
    field: R.propOr('id_franchise', R.pathOr('CREATED_AT', ['field'], orderBy), fieldsMap),
    direction: R.pathOr('ASC', ['direction'], orderBy),
  };

  return {
    order: [
      R.ifElse(
        R.isNil,
        () => orderField,
        () => R.assoc('last', cursor, orderField),
      )(cursor),
    ],
    pageLength: first,
  };
};

const getFranchises = (_, args, { client }) => client
  .reporting
  .franchise_stadiums
  .find({ is_active: true }, buildQueryOpts(args))
  .then(franchises => franchises.map(R_.camelizeKeys))
  .then(franchises => ({
    cursor: R.prop('idFranchise', R.last(franchises)),
    nodes: franchises,
  }))
  .catch(err => console.log(err));

export const resolvers = {
  Query: {
    franchises: getFranchises,
  },
};

export default {
  typeDefs,
  resolvers,
};
