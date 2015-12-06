import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import LandingPage from './components/public/landing_page';
import Dashboard from './components/home/dashboard';
import Home from './components/home/home';
import AuthStore from './stores/auth';
import history from './utils/history';
import 'es6-shim';

function requireAuth(nextState, replaceState) {
  if (!AuthStore.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/');
  }
}

function takeMeHome(nextState, replaceState) {
  if (AuthStore.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname },
                 '/home/dashboard');
  }
}

React.render((
  <Router history={history}>
    <Route path="/" component={LandingPage} onEnter={takeMeHome}/>
    <Route path="home" component={Home} onEnter={requireAuth}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard} />
    </Route>
    <Route path="*" component={LandingPage} />
  </Router>
), document.getElementById('app'));
