'use strict';

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async () => {
    const env = process.env.NODE_ENV || 'local';
    const config = await (0, _config2.default)(env);

    const app = (0, _app2.default)(config);
    const port = app.get('port');
    const host = app.get('host');
    app.listen(port, host, () => _winston2.default.info('Application started on http://%s:%d.', app.get('host'), port));

    process.on('unhandledRejection', (reason, p) => _winston2.default.error('Unhandled Rejection at: Promise ', p, reason));
};

// Go!
/* eslint-disable no-console */
init().catch(err => _winston2.default.error(err));