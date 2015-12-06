import Reflux from 'reflux';
import request from 'superagent';
import UserActions from '../actions/user';
import AuthStore from '../stores/auth';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: UserActions,

  init() {
    this.user = {
      referrer: {}
    };
  },

  getReferrerId() {
    return this.user.referrer.id;
  },

  onRegister(user) {
    let payload = Object.assign(user, { referrer_id: this.getReferrerId() });
    LoaderActions.load();
    request.post('/api/v1/users')
    .send(payload)
    .end((err, res) => {
      LoaderActions.load.completed();
      if (err) {
        UserActions.register.failed(res);
      } else {
        UserActions.register.completed(res);
      }
    });
  },

  onRegisterCompleted: function(res) {
    let user = res.body.user;
    this.trigger(user);
    AuthStore.logIn(res);
  },

  onRegisterFailed: function(res) {
    let validatedUser = Object.assign(res.body.user,
                                      { errors: res.body.meta.errors });
    this.trigger(validatedUser);
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
        let referrer = res.body.referrer;
        UserActions.verify.completed(referrer);
      }
    });
  },

  onVerifyCompleted(referrer) {
    this.user.referrer = referrer;
    this.trigger(this.user);
  },

  onVerifyFailed(res) {
    console.log(res);
  }
});
