/* eslint-disable no-console */
import logger from 'winston';
import configureApp from './app';
import getConfig from './config';

const init = async (getConfig) => {

    const env = process.env.NODE_ENV || 'local';
    const config = await getConfig(env);

    const app = configureApp(config);
    const port = app.get('port');
    const server = app.listen(port);

    process.on('unhandledRejection', (reason, p) =>
        logger.error('Unhandled Rejection at: Promise ', p, reason)
    );

    server.on('listening', () =>
        logger.info('Application started on http://%s:%d.', app.get('host'), port)
    );
};

// Go!
init(getConfig);