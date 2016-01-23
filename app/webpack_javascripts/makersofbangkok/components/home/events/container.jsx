import React from 'react';
import Reflux from 'reflux';
import EventStore from '../../../stores/event';
import EventActions from '../../../actions/event';
import AuthStore from '../../../stores/auth';
import VenueMap from './map';
import moment from 'moment';

const VenueImage = ({venue}) => {
  return <img src={venue.image_url} id="venue-image"
              alt={`${venue.name} cover image`} />;
};

const SignUp = (props) => {
  let { capacity, attendees } = props;
  return <span>{capacity - attendees.length}</span>;
};

const PromptSignIn = () => {
  return <p>Sign in, would ya?</p>;
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
            <h2>{name}</h2>
            <h3>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>
              <a href={venue.url} target="_blank">{venue.name}</a>
              , {venue.address}
            </h3>
            <p className="description">
              {description}
            </p>
            { loggedIn ?
              <SignUp capacity={capacity} attendees={attendees} /> :
              <PromptSignIn />
            }
          </div>
        </div>
    </div>;
  }
});
