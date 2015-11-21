import React from 'react';
import { Router, Route } from 'react-router';
import LandingPage from './components/public/landing_page';
import Dashboard from './components/dashboard';
import AuthStore from './stores/auth';
import history from './utils/history';

function requireAuth(nextState, replaceState) {
  if (!AuthStore.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/');
  }
}

React.render((
  <Router history={history}>
    <Route path="/" component={LandingPage} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
  </Router>
), document.getElementById('app'));
