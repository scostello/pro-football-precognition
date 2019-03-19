import compress from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'winston';
import errorHandler from 'errorhandler';
import express from 'express';

import connectors from './connectors';
import api from './api';

const enhance = (app) => {
  app.configure = function configure(fn) {
    fn.call(this, this);

    return this;
  };

  return app;
};

export default (config = {}) => {
  const app = enhance(express());

  // Load app configuration
  Object
    .keys(config)
    .forEach(name => app.set(name, config[name]));

  // Set up Plugins and providers
  app
    .use(cors())
    .use(helmet())
    .use(compress())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/health', (req, res) => res.sendStatus(200));

  // Set up Connectors and the API
  app
    .configure(connectors.orm)
    .configure(api);

  // Configure a middleware for 404s and the error handler
  app.use(errorHandler({ logger }));

  return app;
};
