'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _model = require('./teams/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    const teams = (0, _model2.default)(app);

    return {
        teams
    };
};