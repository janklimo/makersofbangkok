import React from 'react';
import Reflux from 'reflux';
import AuthStore from '../../stores/auth';
import UserStore from '../../stores/user';
import UserActions from '../../actions/user';
import welcomeEmail from './welcome_email';
import EventContainer from './events/container';

const FriendsMessage = (props) => {
  let { friends, email, firstName } = props;
  if (!friends) {
    return <p>Loading...</p>;
  }
  let subject = 'Invitation to join Makers of Bangkok';
  let body = welcomeEmail(email, firstName);
  let noFriends = <p>
    Seems you haven't referred anybody yet :(<br />
    <a href={`mailto:?subject=${subject}&body=${body}`} target="_blank">
      Invite your first friend now!
    </a>
  </p>;
  let hasFriends = <p>
    You've introduced Makers of Bangkok to
    <span className="teal"> {friends.length} </span>
    other great {friends.length > 1 ? 'people' : 'person'}. You rock!<br />
    <a href={`mailto:?subject=${subject}&body=${body}`} target="_blank">
      Invite more of your friends!
    </a>
  </p>;

  return friends.length > 0 ? hasFriends : noFriends;
};

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
    let { id, email, first_name } = this.state;
    let friends = this.state.friends;

    return <div id="dashboard">
      <p id="greeting">
        Welcome, <span className="teal">{first_name}</span>!
      </p>
      <p>
        Thank you for being Bangkok's maker
      </p>
      <div className="medal">
        <span className="label">#{id}</span>
      </div>
      <FriendsMessage friends={friends} email={email}
        firstName={first_name} />
      <EventContainer />
    </div>;
  }
});
