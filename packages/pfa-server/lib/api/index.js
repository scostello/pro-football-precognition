'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _graphqlTools = require('graphql-tools');

var _schema = require('./schema');

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    var _createModels = (0, _models2.default)(app);

    const teams = _createModels.teams;


    const schema = (0, _graphqlTools.makeExecutableSchema)({
        typeDefs: _schema.typeDefs,
        resolvers: _schema.resolvers
    });

    app.use('/graphql', (0, _apolloServerExpress.graphqlExpress)(() => ({
        schema,
        context: {
            teams
        }
    })));

    app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
        endpointURL: '/graphql'
    }));
};