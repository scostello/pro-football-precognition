// @flow
import { gql } from 'apollo-server';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';

const FranchiseSchema = gql`
  
  type SeasonStats {
    season            : Int!
    totalHomeGames    : Int!
    totalAwayGames    : Int!
    totalGames        : Int!
    totalWins         : Int!
    totalLosses       : Int!
    totalTies         : Int!
    winningPercentage : Float!
  }
  
  type Franchise {
    idFranchise       : String!
    teamFull          : String!
    teamAbbr          : String!
    mascot            : String!
    stadiumName       : String
    activeFrom        : Int!
    activeTo          : Int!
    isActive          : Boolean!
    seasonStats       : [SeasonStats]!
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

const getSeasonStats = ({ teamAbbr }, args, { client }) => {
  return client
    .reporting
    .team_game_outcomes_materialized
    .find({ team_abbr: teamAbbr }, { order: [{ field: 'season', direction: 'ASC' }] })
    .then(gameOutcomes => gameOutcomes.map(R_.camelizeKeys));
};

export const resolvers = {
  Query: {
    franchises: getFranchises,
  },
  Franchise: {
    seasonStats: getSeasonStats,
  },
};

export default {
  typeDefs,
  resolvers,
};
