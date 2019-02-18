import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Dashboard from '../pages/dashboard';

const history = createHistory();

export default () => (
  <Router history={history}>
    <Route path="/" render={() => <Dashboard />} />
  </Router>
);
