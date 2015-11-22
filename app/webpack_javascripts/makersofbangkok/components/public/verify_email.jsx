import React from 'react/addons';
import { Button, Input } from 'react-bootstrap/lib';
import UserActions from '../../actions/user';
import classNames from 'classnames';
import Loader from '../../shared/loader';

export default React.createClass({
  mixins: [ React.addons.LinkedStateMixin ],

  getInitialState() {
    return {
      referrerEmail: '',
      showResult: false
    };
  },

  verify(e) {
    e.preventDefault();
    UserActions.verify(this.state.referrerEmail);
    this.setState({ showResult: true });
  },

  render() {
    let { showResult } = this.state;
    let { name } = this.props;
    let result;
    if (!name) {
      result = 'Bummer! We don\'t know anybody with that email :(';
    }

    const innerButton = <Button type="submit">Verify</Button>;
    return <div className={classNames({hidden: name})}>
      <p>Makers of Bangkok is invitation-only.<br /></p>
      <form onSubmit={this.verify}>
        <Input type="text" name="referrer-email"
          placeholder="Their email address"
          label="Who is the cool person who invited you?"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('referrerEmail')}
          buttonAfter={innerButton} />
      </form>
      <Loader showResult={showResult} display={result}/>
    </div>;
  }
});

