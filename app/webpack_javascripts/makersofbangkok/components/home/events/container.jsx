import React from 'react';
import Reflux from 'reflux';
import EventStore from '../../../stores/event';
import EventActions from '../../../actions/event';
import VenueMap from './map';

export default React.createClass({
  mixins: [ Reflux.connect(EventStore) ],

  componentDidMount() {
    EventActions.getUpcomingEvent();
  },

  render() {
    let { name, venue } = this.state;

    return <div id="event">
      Upcoming event: {name}
      <br />
    <VenueMap venue={venue} />
    </div>;
  }
});
