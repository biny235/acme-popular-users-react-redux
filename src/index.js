import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import Main from './Main';

const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <Main />
  </Router>
  , app)