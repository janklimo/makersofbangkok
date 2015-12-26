import React from 'react';
import Reflux from 'reflux';
import AuthStore from '../../stores/auth';
import UserStore from '../../stores/user';
import UserActions from '../../actions/user';

const FriendsMessage = React.createClass({
  render() {
    let { count, email, firstName } = this.props;
    let subject = 'Invitation to join Makers of Bangkok';
    let body = `Hey, ===name===!
%0D%0A%0D%0A
Makers of Bangkok is an invitation-only network of people doing cool things
 in Bangkok. It's a colorful mix of entrepreneurs, programmers, artists,
 designers, photographers, event organizers, etc.
%0D%0A%0D%0A
Members organize small meetups of no more than 10 people every 2 weeks or so.
 It's an awesome opportunity to have meaningful conversations, bounce ideas
 off each other, and make some great connections with like-minded people.
%0D%0A%0D%0A
You can sign up using this link:%0D%0A
http://www.makersofbangkok.com/
%0D%0A%0D%0A
... and use my email ${email} to get verified. You'll get updates about
 all the upcoming events. Maybe see you on the next one?
%0D%0A%0D%0A
Best,
%0D%0A
${firstName}`;
    let noFriends = <p>
      Seems you haven't referred anybody yet :(<br />
      <a href={`mailto:?subject=${subject}&body=${body}`} target="_blank">
        Invite your first friend now!
      </a>
    </p>;
    let hasFriends = <p>
      You've introduced Makers of Bangkok to
      <span className="teal"> {count} </span>
      other great {count > 1 ? 'people' : 'person'}. You rock!<br />
      <a href={`mailto:?subject=${subject}&body=${body}`} target="_blank">
        Invite more of your friends!
      </a>
    </p>;

    return count > 0 ? hasFriends : noFriends;
  }
});

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
    let { id, email, first_name, friends_count } = this.state;

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
      <FriendsMessage count={friends_count} email={email}
        firstName={first_name}/>
    </div>;
  }
});
