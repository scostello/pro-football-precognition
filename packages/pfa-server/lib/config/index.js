'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _default = require('./default.json');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async env => {
    if (env === 'local') {
        _winston2.default.warn('NODE_ENV set to \'local\'. Using config in \'default.json\'.');
        return _default2.default;
    }

    return {};
};