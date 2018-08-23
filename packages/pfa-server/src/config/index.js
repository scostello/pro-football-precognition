import logger from 'winston';

export default async (env) => {

    if (env === 'local') {
        logger.warn('NODE_ENV set to \'local\'. Using config in \'default.json\'.');
        return require('./default.json');
    }

    return {};
};