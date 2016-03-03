import React from 'react';
import AuthStore from '../../../stores/auth';
import moment from 'moment';
import SignUp from './sign_up';

const VenueImage = ({ venue }) => {
  return <img src={venue.image_url} id="venue-image"
    alt={`${venue.name} cover image`} />;
};

const PromptSignIn = () => {
  return <p>Sign in, would ya?</p>;
};

const AttendanceBadge = ({spotsLeft}) => {
  let quantifier = spotsLeft === 1 ?
    'spot' : 'spots';
  return <span className="badge">
    { spotsLeft } { quantifier } left
  </span>;
};

export default React.createClass({
  render() {
    let { event } = this.props;

    if (!event) {
      return null;
    }

    let { name, venue, date, description, attendees } = event;
    let spotsLeft = event.spots_available;
    let eventId = event.id;
    const loggedIn = AuthStore.loggedIn();

    return <div className="row">
      <div className="col-sm-6 no-gutter">
        <VenueImage venue={venue} />
      </div>
      <div className="col-sm-6 details">
        <span className="name">{name}</span>
        <AttendanceBadge spotsLeft={spotsLeft} />
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
            attendees={ attendees } spotsLeft={ spotsLeft }/> :
          <PromptSignIn />
        }
      </div>
    </div>;
  }
});
