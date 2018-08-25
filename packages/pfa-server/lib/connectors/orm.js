'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _bookshelf = require('bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    var _app$get = app.get('postgres');

    const client = _app$get.client,
          connection = _app$get.connection;

    const db = (0, _knex2.default)({ client, connection });
    const orm = (0, _bookshelf2.default)(db).plugin('registry').plugin('case-converter');

    app.set('orm', orm);

    return app;
};