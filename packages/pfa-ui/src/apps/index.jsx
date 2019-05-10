// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './global.less';

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

if (MOUNT_NODE !== null) {
  // Go!
  ReactDOM.render(<App />, MOUNT_NODE);
}
