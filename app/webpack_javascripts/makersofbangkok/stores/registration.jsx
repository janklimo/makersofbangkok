import Reflux from 'reflux';
import request from 'superagent';
import RegistrationActions from '../actions/registration';
import EventActions from '../actions/event';
import AuthStore from '../stores/auth';

export default Reflux.createStore({
  listenables: RegistrationActions,

  onCreateRegistration(userId, eventId) {
    request.post(`/api/v1/users/${userId}/registrations`)
    .set(AuthStore.credentials)
    .send({ registration: { user_id: userId, event_id: eventId } })
    .end(err => {
      if (err) {
        console.error(err);
      } else {
        EventActions.getUpcomingEvent();
      }
    });
  },
});
