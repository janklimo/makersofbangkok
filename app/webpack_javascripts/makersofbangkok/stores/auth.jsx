import Reflux from 'reflux';
import request from 'superagent';
import AuthActions from '../actions/auth';
import history from '../utils/history';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: [ AuthActions ],

  init() {
    this.user = {};
  },

  onLogin(user) {
    LoaderActions.load();
    request.post('/api/v1/users/sign_in')
    .send(user).end((err, res) => {
      LoaderActions.load.completed();
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

  logIn(res) {
    let token = res.headers['access-token'];
    localStorage.token = token;
    this.user = res.body.user;
    this.trigger(this.user);
    history.replaceState(null, '/home/dashboard');
  },

  onLoginCompleted(res) {
    this.logIn(res);
  },

  onLoginFailed(err) {
    this.trigger({ error: err.response.body.meta.errors.message });
  },

  onLogout() {
    delete localStorage.token;
    this.user = {};
    this.trigger(this.user);
    history.replaceState(null, '/');
  }
});
