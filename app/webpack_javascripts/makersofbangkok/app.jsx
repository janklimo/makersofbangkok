import React from 'react';
import { Router, Route } from 'react-router';
import LandingPage from './components/public/landing_page';

React.render((
  <Router>
    <Route path="/" component={LandingPage} />
  </Router>
), document.getElementById('app'));
