import Reflux from 'reflux';
import request from 'superagent';
import AuthActions from '../actions/auth';

export default Reflux.createStore({
  listenables: [ AuthActions ],

  init() {
    this.token = localStorage.token || {};
  },

  onLogin(user) {
    request.post('/api/v1/users/sign_in')
    .send(user).end((err, res) => {
      if (err) {
        AuthActions.login.failed(err);
      } else {
        AuthActions.login.completed(res);
      }
    });
  },

  onLoginCompleted(res) {
    console.log(res.headers);
    let token = res.headers['access-token'];
    localStorage.token = token;
    this.token = token;
    this.trigger(this.token);
  },

  onLoginFailed(err) {
    console.log(err);
  }
});
