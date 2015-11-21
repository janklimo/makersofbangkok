import Reflux from 'reflux';
import request from 'superagent';
import AuthActions from '../actions/auth';
import history from '../utils/history';

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

  loggedIn() {
    return !!localStorage.token;
  },

  onLoginCompleted(res) {
    let token = res.headers['access-token'];
    localStorage.token = token;
    this.token = token;
    this.trigger({ token: this.token });
    history.replaceState(null, '/dashboard');
  },

  onLoginFailed(err) {
    this.trigger({ error: err.response.body.meta.errors.message });
  }
});
