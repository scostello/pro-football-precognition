// @flow
import * as React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Layout from './common/Layout';

const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <Layout />
  </Router>
);
