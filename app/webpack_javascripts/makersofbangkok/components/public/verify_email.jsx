import React from 'react/addons';
import Reflux from 'reflux';
import { Button, Input } from 'react-bootstrap/lib';
import UserActions from '../../actions/user';
import LoaderStore from '../../stores/loader';
import classNames from 'classnames';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(LoaderStore)
  ],

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
    let { loading } = this.state;
    let { name } = this.props;
    let loaderClass = classNames('heartbeat-loader', { hidden: !loading });
    let resultClass =
      classNames({ hidden: loading || !this.state.showResult });
    let result;
    if (name) {
      result = `It's a pleasure to meet ${name}'s friend!`;
    } else {
      result = 'Bummer! We don\'t know anybody with that email :(';
    }

    const innerButton = <Button type="submit">Verify</Button>;
    return <div className={classNames({hidden: name})}>
      <p>Makers of Bangkok is invitation-only.<br /></p>
      <form onSubmit={this.verify}>
        <Input type="text"
          placeholder="Their email address"
          label="Who is the cool person who invited you?"
          groupClassName="group-class"
          labelClassName="label-class"
          valueLink={this.linkState('referrerEmail')}
          buttonAfter={innerButton} />
      </form>
      <div className="result">
        <div className={loaderClass}></div>
        <p className={resultClass}>{result}</p>
      </div>
    </div>;
  }
});

