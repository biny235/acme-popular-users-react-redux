import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { fetchUsers } from './store';

import Main from './Main';

const app = document.getElementById('app');

fetchUsers()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
  , app)
