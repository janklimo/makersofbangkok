import React from 'react/addons';
import Reflux from 'reflux';
import { Modal, Button, Input } from 'react-bootstrap/lib';
import UserActions from '../../actions/user';
import LoaderStore from '../../stores/loader';
import UserStore from '../../stores/user';
import classNames from 'classnames';

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
    let { referrer, loading } = this.state;
    let loaderClass = classNames('heartbeat-loader', { hidden: !loading });
    let result;
    if (referrer) {
      if (referrer.user) {
        let name = referrer.user.first_name;
        result = `It's a pleasure to meet ${name}'s friend!`;
      } else {
        result = 'Bummer! We don\'t know anybody with that email :(';
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
          placeholder="Their email address"
          label="Who is the cool person who invited you?"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('referrerEmail')}
          buttonAfter={innerButton} />
        <div className="result">
          <div className={loaderClass}></div>
          <p className={classNames({hidden: loading})}>{result}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>;
  }
});

