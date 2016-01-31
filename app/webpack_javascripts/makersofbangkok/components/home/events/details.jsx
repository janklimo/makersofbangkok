import React from 'react';
import AuthStore from '../../../stores/auth';
import VenueMap from './map';
import moment from 'moment';
import SignUp from './sign_up';

const VenueImage = ({ venue }) => {
  return <img src={venue.image_url} id="venue-image"
    alt={`${venue.name} cover image`} />;
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
  render() {
    let { event } = this.props;

    if (!event) {
      return null;
    }

    let { name, venue, date, description,
      capacity, attendees } = event;
    let eventId = event.id;
    const loggedIn = AuthStore.loggedIn();

    return <div className="row">
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
          <SignUp eventId={ eventId } date={ date }
            attendees={ attendees }/> :
          <PromptSignIn />
        }
      </div>
    </div>;
  }
});
