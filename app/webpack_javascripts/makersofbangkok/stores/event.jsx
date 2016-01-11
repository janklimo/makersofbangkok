import Reflux from 'reflux';
import request from 'superagent';
import EventActions from '../actions/event';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: EventActions,

  onGetUpcomingEvent() {
    LoaderActions.load();
    request.get(`/api/v1/events/upcoming`)
    .end((err, res) => {
      LoaderActions.load.completed();
      if (err) {
        console.error(err);
      } else {
        EventActions.getUpcomingEvent.completed(res.body.event);
      }
    });
  },

  onGetUpcomingEventCompleted(event) {
    this.trigger(event);
  }
});
