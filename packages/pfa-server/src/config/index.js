import logger from 'winston';
import defaultConfig from './default.json';

export default async (env) => {
    if (env === 'local') {
        logger.warn('NODE_ENV set to \'local\'. Using config in \'default.json\'.');
        return defaultConfig;
    }

    return {};
};
