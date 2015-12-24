import React from 'react';
import Reflux from 'reflux';
import AuthStore from '../../stores/auth';
import UserStore from '../../stores/user';
import UserActions from '../../actions/user';

export default React.createClass({
  mixins: [
    Reflux.connect(AuthStore),
    Reflux.connect(UserStore)
  ],

  componentDidMount() {
    if (!this.state.first_name) {
      UserActions.getUser();
    }
  },

  render() {
    let name = this.state.first_name;
    return <div>
      <p id="greeting">
        Welcome, <span className="teal">{name}</span>!
      </p>
    </div>;
  }
});
