import React from 'react/addons';
import Reflux from 'reflux';
import { Modal, Input, Button } from 'react-bootstrap';
import AuthActions from '../../actions/auth';
import AuthStore from '../../stores/auth';
import Loader from '../../shared/loader';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(AuthStore)
  ],

  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    let user = { email, password };
    AuthActions.login(user);
  },

  render() {
    let { error } = this.state;
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
          <Loader showResult={!!error} display={error}/>
          <div className="text-center">
            <Button type="submit" className="btn btn-main">
              Let&#39;s go!
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>;
  }
});
