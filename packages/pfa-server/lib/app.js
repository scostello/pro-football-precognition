'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _connectors = require('./connectors');

var _connectors2 = _interopRequireDefault(_connectors);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const enhance = app => {
    app.configure = function configure(fn) {
        fn.call(this, this);

        return this;
    };

    return app;
};

exports.default = (config = {}) => {
    const app = enhance((0, _express2.default)());

    // Load app configuration
    Object.keys(config).forEach(name => app.set(name, config[name]));

    // Set up Plugins and providers
    app.use((0, _cors2.default)()).use((0, _helmet2.default)()).use((0, _compression2.default)()).use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: true })).use('/health', (req, res) => res.sendStatus(200));

    // Set up Connectors and the API
    app.configure(_connectors2.default.orm).configure(_api2.default);

    // Configure a middleware for 404s and the error handler
    app.use((0, _errorhandler2.default)({ logger: _winston2.default }));

    return app;
};