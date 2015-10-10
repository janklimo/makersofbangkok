import Reflux from 'reflux';
import request from 'superagent';
import UserActions from '../actions/user';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: UserActions,

  onVerify(email) {
    LoaderActions.load();
    request.post('/api/v1/users/verify')
    .send({ email: email })
    .end((err, res) => {
      LoaderActions.load.completed();
      if (err) {
        console.error(err);
      } else {
        let referrer = res.body;
        UserActions.verify.completed(referrer);
      }
    });
  },

  onVerifyCompleted(referrer) {
    this.trigger(referrer);
  }
});
