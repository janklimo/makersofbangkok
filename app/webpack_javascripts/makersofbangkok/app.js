import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

const LandingPage = React.createClass({
  render() {
    let windowHeight = $(window).height();
    return <section id="home" style={{height: windowHeight}}>
      <div className="container">
        <div className="row">
          <div className="logo-container text-center">
            <img id="logo" src="assets/logo.png" />
          </div>
        </div>
        <div className="row">
          <div className="taglines text-center">
            <h2>We are</h2>
            <h1>Makers of Bangkok</h1>
          </div>
        </div>
        <div className="row">
          <div className="intro text-center">
            <p>We're entrepreneurs, programmers, designers,
               photographers, event organizers.<br />
               What we have in common is our passion for building,
               creating, and making things happen.
               <br /><br />
               Sounds like you?</p>
          </div>
        </div>
        <div className="row">
          <div className="cta text-center">
            <a href="#" className="btn btn-main">Join Us!</a>
          </div>
        </div>
      </div>
    </section>;
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={LandingPage} />
  </Router>
), document.getElementById('app'));
