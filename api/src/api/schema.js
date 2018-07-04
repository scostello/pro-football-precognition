import merge from 'lodash.merge';
import { typeDefs as teamsTypeDefs } from './teams/schema';
import { resolvers as teamsResolvers } from './teams/schema';

const rootTypeDefs = [`
    # Base Query type we'll use to extend in the other modules
    type Query {
        _ : Boolean
    }
    
    type Mutation {
        _ : Boolean
    }
`];

const rootResolvers = {
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