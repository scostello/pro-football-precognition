// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './common/App';

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

if (MOUNT_NODE !== null) {
  // Go!
  ReactDOM.render(<App />, MOUNT_NODE);
}
