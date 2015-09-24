import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

const LandingPage = React.createClass({
  render() {
    return <div>Neat!</div>;
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={LandingPage} />
  </Router>
), document.getElementById('app'));
