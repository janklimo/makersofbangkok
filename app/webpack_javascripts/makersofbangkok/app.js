import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

const LandingPage = React.createClass({
  render() {
    let windowHeight = $(window).height();
    return <section id="home" style={{height: windowHeight}}>
    </section>;
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={LandingPage} />
  </Router>
), document.getElementById('app'));
