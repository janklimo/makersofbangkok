import React from 'react';
import Reflux from 'reflux';
import EventStore from '../../../stores/event';
import EventActions from '../../../actions/event';
import VenueMap from './map';

const VenueImage = ({venue}) => {
  return <img src={venue.image_url} id="venue-image"
              alt={`${venue.name} cover image`} />;
};

export default React.createClass({
  mixins: [ Reflux.connect(EventStore) ],

  componentDidMount() {
    EventActions.getUpcomingEvent();
  },

  render() {
    let { name, venue } = this.state;

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
          <div className="col-sm-6">
            <h2>{name}</h2>
          </div>
        </div>
    </div>;
  }
});
