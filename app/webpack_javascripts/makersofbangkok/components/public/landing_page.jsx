import React from 'react';
import SignupModal from './signup_modal';
import Navbar from './navbar';
const s3 = 'https://s3-ap-southeast-1.amazonaws.com/makersofbangkok';
const factor = 0.9;

export default React.createClass({
  getInitialState() {
    return {
      windowHeight: window.innerHeight * factor,
      showModal: false
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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    // needed to properly resize the bg on mobile
    setTimeout(() => {
      this.setState({ windowHeight: window.innerHeight * factor });
    }, 400);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  render() {
    let bgStyle = { height: this.state.windowHeight };
    return <div>
      <Navbar />
      <section id="home" style={ bgStyle }>
        <div className="container" id="landing-container">
          <div className="row">
            <div className="logo-container text-center">
              <img id="logo" src={`${s3}/logo.png`} />
            </div>
          </div>
          <div className="row">
            <div className="taglines text-center">
              <h2>We are</h2>
              <h1>Makers of Bangkok</h1>
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
      <section id="what-its-about">
        <div className="container">
          <div className="row">
            <h1>What It's All About</h1>
            <div className="col-sm-4">
              <div className="section-subheader">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="section-title">
                Invitation Only
              </div>
              <div className="section-text">
                Membership is not open to public. We leave it up to our users
                to invite people they like and respect. Inviting a new member
                is a sign of trust that it's a person other members will
                benefit from meeting.
              </div>
            </div>
            <div className="col-sm-4">
              <div className="section-subheader">
                <i className="fa fa-users"></i>
              </div>
              <div className="section-title">
                Small Groups
              </div>
              <div className="section-text">
                Attendance is normally limited to 10 people. This way,
                everybody gets a chance to meet and connect with all the other
                attendees.
              </div>
            </div>
            <div className="col-sm-4">
              <div className="section-subheader">
                <i className="fa fa-lightbulb-o"></i>
              </div>
              <div className="section-title">
                Meaningful Conversations
              </div>
              <div className="section-text">
                While meetups have no formal structure, we do make sure that
                everybody gets a chance to introduce themselves, speak about
                what they're excited about, tell others about the problems
                they are trying to solve, or need help with. Get instant
                feedback, ideas, intros = the most value out of one evening
                possible.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
  }
});
