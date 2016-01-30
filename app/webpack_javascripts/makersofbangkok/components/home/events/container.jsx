import React from 'react';
import Reflux from 'reflux';
import EventStore from '../../../stores/event';
import EventActions from '../../../actions/event';
import AuthStore from '../../../stores/auth';
import VenueMap from './map';
import moment from 'moment';
import CountDown from './countdown';
import find from 'lodash/collection/find';

const VenueImage = ({ venue }) => {
  return <img src={venue.image_url} id="venue-image"
              alt={`${venue.name} cover image`} />;
};

const SignUp = (props) => {
  const userId = localStorage.userId;
  const { date, attendees } = props;
  const attending = find(attendees, (o) => o.id === parseInt(userId, 10));

  return <div>
    { attending ? <div>
        <span className="teal">You're in!</span> See you in:
        <br />
        <CountDown date={ date } />
      </div> : <div>
        <span>Time left to register:</span>
        <br />
        <CountDown date={ date } />
        <a href="#" className="btn btn-main">Sign Me Up!</a>
      </div>
    }
  </div>;
};

const PromptSignIn = () => {
  return <p>Sign in, would ya?</p>;
};

const AttendanceBadge = (props) => {
  let { capacity, attendees } = props;
  return <span className="badge">
    {capacity - attendees.length} spots left
  </span>;
};

export default React.createClass({
  mixins: [ Reflux.connect(EventStore) ],

  componentDidMount() {
    EventActions.getUpcomingEvent();
  },

  render() {
    let { name, venue, date, description, capacity, attendees } = this.state;
    const loggedIn = AuthStore.loggedIn();

    if (!venue) {
      return null;
    }

    return <div id="event">
      <h1>Upcoming event</h1>
        <div className="row">
          <div className="col-sm-6 no-gutter">
            <VenueImage venue={venue} />
            <VenueMap venue={venue} />
          </div>
          <div className="col-sm-6 details">
            <span className="name">{name}</span>
            <AttendanceBadge capacity={capacity} attendees={attendees} />
            <h3>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>
              <a href={venue.url} target="_blank">{venue.name}</a>
              , {venue.address}
            </h3>
            <p className="description">
              {description}
            </p>
            { loggedIn ?
              <SignUp date={ date } attendees={ attendees }/> :
              <PromptSignIn />
            }
          </div>
        </div>
    </div>;
  }
});
