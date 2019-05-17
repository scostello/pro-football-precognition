// @flow
import * as R from 'ramda';
import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server';
import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { fromConfig } from './pubsub';
import players from './players';
import franchises from './franchises';

const rootSchema = gql`
  scalar JSON
  
  enum OrderDirection {
    ASC
    DESC
  }
  
  # Base Query type we'll use to extend in the other modules
  type Query {
    _ : Boolean
    testSubscription: Boolean
  }
  
  type Mutation {
    _: Boolean
  }
  
  type Subscription {
    playOccurred: JSON
  }
`;

const pubsub = fromConfig();

const PLAY_OCCURRED = 'PLAY_OCCURRED';

const rootResolvers = {
  JSON: GraphQLJSON,
  Query: {
    _: () => true,
    testSubscription: () => {
      setInterval(() => {
        pubsub.publish({
          index: 1,
          value: 2,
          // channelId: message.channelId
        });
      }, 2500);
      return true;
    },
  },
  Mutation: {
    _: () => true,
  },
  Subscription: {
    playOccurred: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator(PLAY_OCCURRED),
    },
  },
};

const typeDefs = [
  rootSchema,
  ...players.typeDefs,
  ...franchises.typeDefs,
];

const resolversFrom = R.prop('resolvers');

const resolvers = merge(
  rootResolvers,
  resolversFrom(players),
  resolversFrom(franchises),
);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
