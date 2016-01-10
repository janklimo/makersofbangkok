import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Reflux from 'reflux';
import { Button, ButtonInput } from 'react-bootstrap/lib';
import UserStore from '../../stores/user';
import UserActions from '../../actions/user';
import classNames from 'classnames';
import { TextInput, TextInputWithButton } from '../../shared/inputs';

export default React.createClass({
  mixins: [
    LinkedStateMixin,
    Reflux.connect(UserStore)
  ],

  getInitialState() {
    return {
      errors: [],
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordType: 'password'
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    UserActions.register(this.state);
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
      <form id="signup-form" onSubmit={this.handleSubmit}>
        <TextInput type="text" id="first-name" name="first-name"
          label="First name" attr="first_name"
          valueLink={this.linkState}
          errors={this.state.errors}
        />
        <TextInput type="text" id="last-name" name="last-name"
          label="Last name" attr="last_name"
          valueLink={this.linkState}
          errors={this.state.errors}
        />
        <TextInput type="text" id="email" name="email"
          label="Email" attr="email"
          valueLink={this.linkState}
          errors={this.state.errors}
        />
        <TextInputWithButton type={this.state.passwordType}
          id="password" name="password"
          label="Password" attr="password"
          valueLink={this.linkState}
          buttonAfter={innerButton}
          errors={this.state.errors}
        />
        <div className="text-center">
          <ButtonInput type="submit" value="Sign Me Up!"
            className="btn btn-main"/>
        </div>
      </form>
    </div>;
  }
});

