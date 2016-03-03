import React from 'react';
import SignupModal from './signup_modal';
import Navbar from './navbar';
import WhatItsAbout from './what_its_about';
import UpcomingEvent from '../home/events/container';
const s3 = 'https://s3-ap-southeast-1.amazonaws.com/makersofbangkok';
const factor = 0.9;

export default React.createClass({
  getInitialState() {
    return {
      windowHeight: window.innerHeight * factor,
      showModal: false,
      scrollTop: 0
    };
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  openModal() {
    this.setState({ showModal: true });
  },

  handleResize() {
    this.setState({ windowHeight: window.innerHeight * factor });
  },

  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop;
    this.setState({ scrollTop });
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    // needed to properly resize the bg on mobile
    setTimeout(() => {
      this.setState({ windowHeight: window.innerHeight * factor });
    }, 400);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },

  render() {
    let bgStyle = { height: this.state.windowHeight };
    return <div>
      <Navbar top={ this.state.scrollTop } />
      <section id="home" style={ bgStyle }>
        <div className="container" id="landing-container">
          <div className="row">
            <div className="col-sm-12">
              <div className="logo-container text-center">
                <img id="logo" src={`${s3}/logo.png`} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="taglines text-center">
                <h2>We are</h2>
                <h1>Makers of Bangkok</h1>
              </div>
            </div>
          </div>
          <div className="intro text-center">
            <div>We&#39;re entrepreneurs, programmers, designers,
              photographers, event organizers.<br />
              What we have in common is our passion for building,
              creating, and making things happen.
              <br /><br />
              Sounds like you?
              <div className="cta text-center">
                <a href="#" className="btn btn-main" onClick={this.openModal}>
                  Join Us!
                </a>
              </div>
            </div>
          </div>
        </div>
        <SignupModal show={this.state.showModal} onHide={this.closeModal}/>
      </section>
      <WhatItsAbout />
      <UpcomingEvent />
    </div>;
  }
});
