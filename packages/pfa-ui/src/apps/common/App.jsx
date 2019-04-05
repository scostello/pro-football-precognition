// @flow
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Sample } from 'apps/widgets';
import './global.less';

const history = createBrowserHistory();

export const Main = () => <Sample />;

export default () => (
  <Router history={history}>
    <Main />
  </Router>
);
