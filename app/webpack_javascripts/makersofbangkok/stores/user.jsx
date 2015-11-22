import Reflux from 'reflux';
import request from 'superagent';
import UserActions from '../actions/user';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: UserActions,

  init() {
    this.referrer = {};
  },

  getReferrerId() {
    return this.referrer.id;
  },

  onRegister(user) {
    LoaderActions.load();
    request.post('/api/v1/users')
    .send(user)
    .end((err, res) => {
      LoaderActions.load.completed();
      if (err) {
        console.log(res);
        UserActions.register.failed(res);
      } else {
        console.log(res);
        UserActions.register.completed(res);
      }
    });
  },

  onVerify(email) {
    LoaderActions.load();
    request.post('/api/v1/users/verify')
    .send({ email: email })
    .end((err, res) => {
      LoaderActions.load.completed();
      if (err) {
        UserActions.verify.failed(res);
      } else {
        let referrer = res.body;
        UserActions.verify.completed(referrer);
      }
    });
  },

  onVerifyCompleted(referrer) {
    this.referrer.id = referrer.user.id;
    this.trigger(referrer);
  },

  onVerifyFailed(res) {
    console.log(res);
  }
});
