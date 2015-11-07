import React from 'react/addons';
import Reflux from 'reflux';
import { Modal, Input } from 'react-bootstrap';
import AuthActions from '../../actions/auth';
import AuthStore from '../../stores/auth';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(AuthStore, 'referrer')
  ],

  getInitialState() {
    return {
      email: '',
      password: '',
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    let user = { email, password };
    AuthActions.login(user);
  },

  render() {
    return <Modal show={this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome back!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Input type="text"
            label="Email"
            groupClassName="group-class"
            labelClassName="label-class"
            valueLink={this.linkState('email')} />
          <Input type="password"
            label="Password"
            groupClassName="group-class"
            labelClassName="label-class"
            valueLink={this.linkState('password')} />
          </form>
          <div className="text-center">
            <a href="#" className="btn btn-main" onClick={this.handleSubmit}>
              Let&#39;s go!
            </a>
          </div>
      </Modal.Body>
    </Modal>;
  }
});
