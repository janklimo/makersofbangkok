import React from 'react';
import Reflux from 'reflux';
import { Modal, Button } from 'react-bootstrap';
import UserActions from '../../actions/user';
import UserStore from '../../stores/user';
import VerifyEmail from './verify_email';
import SignupForm from './signup_form';

export default React.createClass({
  mixins: [
    Reflux.connect(UserStore, 'referrer')
  ],

  getInitialState() {
    return { referrerEmail: '' };
  },

  verify() {
    UserActions.verify(this.state.referrerEmail);
  },

  render() {
    let { referrer } = this.state;
    let name;
    if (referrer) {
      if (referrer.user) {
        name = referrer.user.first_name;
      }
    }
    return <Modal show={this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>You&#39;re here!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VerifyEmail name={name} />
        <SignupForm name={name} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>;
  }
});

