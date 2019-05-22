// @flow
import * as React from 'react';
import makeInspectable from 'mobx-devtools-mst';
import { Router } from 'react-router';
import { Provider as MobXProvider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createAppStore } from 'shared/stores';
import Layout from './common/Layout';
import Dashboard from './dashboard';
import Franchises from './franchises';

const history = createBrowserHistory();
const store = createAppStore();

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/',
    content: Dashboard,
  },
  {
    key: 'teams',
    label: 'Teams',
    href: '/teams',
    content: Franchises,
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

// ========================================================
// Dev Tools Setup
// ========================================================

if (process.env.NODE_ENV === 'development') makeInspectable(store);

export default () => (
  <MobXProvider store={store}>
    <Router history={history}>
      <Layout menuItems={menuItems} />
    </Router>
  </MobXProvider>
);
