// @flow
import * as React from 'react';
import { Router } from 'react-router';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createAppStore } from 'shared/stores';
import Layout from './common/Layout';
import Teams from './teams';

const history = createBrowserHistory();
const store = createAppStore();

const menuItems = [
  {
    key: 'teams',
    label: 'Teams',
    href: '/teams',
    content: Teams,
  },
  {
    key: 'players',
    label: 'Players',
    href: '/players',
    content: () => <div>This is teams</div>,
  },
  {
    key: 'seasons',
    label: 'Seasons',
    href: '/seasons',
    content: () => <div>This is seasons</div>,
  },
];

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Layout menuItems={menuItems} />
    </Router>
  </Provider>
);
