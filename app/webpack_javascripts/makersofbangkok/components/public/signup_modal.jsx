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
    Reflux.connect(UserStore)
  ],

  getInitialState() {
    return { referrerEmail: '' };
  },

  verify() {
    UserActions.verify(this.state.referrerEmail);
  },

  render() {
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>;
  }
});

