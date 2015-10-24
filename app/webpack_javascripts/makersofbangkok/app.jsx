import React from 'react';
import { Router, Route } from 'react-router';
import LandingPage from './components/public/landing_page';
import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

React.render((
  <Router history={history}>
    <Route path="/" component={LandingPage} />
  </Router>
), document.getElementById('app'));
