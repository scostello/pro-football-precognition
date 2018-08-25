'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphqlIsoDate = require('graphql-iso-date');

var _schema = require('./teams/schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    Date: _graphqlIsoDate.GraphQLDate,
    Time: _graphqlIsoDate.GraphQLTime,
    DateTime: _graphqlIsoDate.GraphQLDateTime,
    Query: {},
    Mutation: {}
};

const typeDefs = exports.typeDefs = [...rootTypeDefs, ..._schema.typeDefs];

const resolvers = exports.resolvers = (0, _lodash2.default)(rootResolvers, _schema.resolvers);