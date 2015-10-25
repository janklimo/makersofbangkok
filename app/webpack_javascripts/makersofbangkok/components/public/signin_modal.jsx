import React from 'react/addons';
import { Modal, Input } from 'react-bootstrap';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin
  ],

  getInitialState() {
    return {
      email: '',
      password: '',
    };
  },

  handleSubmit(e) {
    e.preventDefault();
  },

  render() {
    return <Modal show={this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome back!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={this.handleSubmit}>
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
            <a href="#" className="btn btn-main">
              Let&#39;s go!
            </a>
          </div>
      </Modal.Body>
    </Modal>;
  }
});
