import compress from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'winston';
import errorHandler from 'errorhandler';
import express from 'express';

export default (config = {}) => {
    const app = express();

    // Load app configuration
    Object.keys(config).forEach(name => app.set(name, config[name]));

    // Set up Plugins and providers
    app
        .use(cors())
        .use(helmet())
        .use(compress())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use('/health', (req, res) => res.sendStatus(200));

    // Configure a middleware for 404s and the error handler
    app.use(errorHandler({ logger }));

    return app;
};