// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const Main = () => <div>{'The Primary Route'}</div>;

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path={'/'} component={Main} />
    </Switch>
  </Router>
);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

if (MOUNT_NODE !== null) {
  // Go!
  ReactDOM.render(<App />, MOUNT_NODE);
}
