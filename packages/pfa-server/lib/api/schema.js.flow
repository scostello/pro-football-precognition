import merge from 'lodash.merge';
import {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime,
} from 'graphql-iso-date';
import {
    typeDefs as teamsTypeDefs,
    resolvers as teamsResolvers,
} from './teams/schema';

const rootTypeDefs = [`

    scalar Date
    scalar Time
    scalar DateTime

    # Base Query type we'll use to extend in the other modules
    type Query {
        _ : Boolean
    }
    
    type Mutation {
        _ : Boolean
    }
`];

const rootResolvers = {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
    Query: {},
    Mutation: {},
};

export const typeDefs = [
    ...rootTypeDefs,
    ...teamsTypeDefs,
];

export const resolvers = merge(
    rootResolvers,
    teamsResolvers,
);
