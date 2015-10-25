import React from 'react/addons';
import { Button, ButtonInput, Input } from 'react-bootstrap/lib';
// import UserActions from '../../actions/user';
import classNames from 'classnames';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin
  ],

  getInitialState() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordType: 'password'
    };
  },

  handleSubmit(e) {
    e.preventDefault();
  },

  toggle() {
    let type = this.state.passwordType;
    type = type === 'password' ? 'text' : 'password';
    this.setState({ passwordType: type });
  },

  render() {
    let { name } = this.props;
    let buttonLabel = this.state.passwordType === 'password' ? 'Show' : 'Hide';
    const innerButton = <Button onClick={this.toggle}>{buttonLabel}</Button>;
    return <div className={classNames('signup-form', {hidden: !name})}>
      <h3 className="text-center">It's a pleasure to meet {name}'s friend!</h3>
      <p>Almost there! Please fill in the form below and you're in.</p>
      <form onSubmit={this.handleSubmit}>
        <Input type="text"
          label="First name"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('firstName')} />
        <Input type="text"
          label="Last name"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('lastName')} />
        <Input type="text"
          label="Email"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('email')} />
        <Input type={this.state.passwordType}
          label="Password"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('password')}
          buttonAfter={innerButton} />
        <div className="text-center">
          <ButtonInput type="submit" value="Sign Me Up!"
            className="btn btn-main"/>
        </div>
      </form>
    </div>;
  }
});

