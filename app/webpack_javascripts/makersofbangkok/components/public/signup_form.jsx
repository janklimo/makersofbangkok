import React from 'react/addons';
import Reflux from 'reflux';
import { Button, ButtonInput, Input } from 'react-bootstrap/lib';
import UserStore from '../../stores/user';
import UserActions from '../../actions/user';
import classNames from 'classnames';
import { TextInput } from '../../shared/inputs';
import 'es6-shim';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
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
    let referrer_id = UserStore.getReferrerId();
    let user = Object.assign({}, this.state, { referrer_id });
    UserActions.register(user);
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
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState}
          errors={this.state.errors}
        />
        <Input type="text" name="last-name"
          label="Last name"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('last_name')} />
        <Input type="text" name="email"
          label="Email"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('email')} />
        <Input type={this.state.passwordType} name="password"
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

