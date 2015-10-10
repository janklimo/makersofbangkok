import React from 'react/addons';
import Reflux from 'reflux';
import { Modal, Button, Input } from 'react-bootstrap/lib';
import UserActions from '../../actions/user';
import LoaderStore from '../../stores/loader';
import UserStore from '../../stores/user';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(LoaderStore),
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
    let result;
    if (referrer) {
      if (referrer.user) {
        let name = referrer.user.first_name;
        result = `It's a pleasure to meet ${name}'s friend!`;
      } else {
        result = 'No Maker with that email :(';
      }
    }
    const innerButton = <Button onClick={this.verify}>Verify</Button>;
    return <Modal show={this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>You&#39;re here!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Makers of Bangkok is invitation-only.<br /></p>
        <Input type="text"
          value={this.state.value}
          placeholder="Their email address"
          label="Who's the cool person who invited you?"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('referrerEmail')}
          buttonAfter={innerButton} />
        <p>{result}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>;
  }
});

