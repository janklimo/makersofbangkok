import React from 'react';
import Reflux from 'reflux';
import EventStore from '../../../stores/event';
import EventActions from '../../../actions/event';
import Details from './details';

export default React.createClass({
  mixins: [ Reflux.connect(EventStore, 'event') ],

  getInitialState() {
    return { event: null };
  },

  componentDidMount() {
    EventActions.getUpcomingEvent();
  },

  render() {
    let { event } = this.state;

    return <section id="event">
      <h1>Upcoming event</h1>
      {
        event ?
          <Details event={ event } /> :
          <h3>No upcoming events yet. Stay tuned!</h3>
      }
    </section>;
  }
});
