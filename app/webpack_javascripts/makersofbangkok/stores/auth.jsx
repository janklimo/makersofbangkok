import Reflux from 'reflux';
import request from 'superagent';
import AuthActions from '../actions/auth';
import history from '../utils/history';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: [ AuthActions ],

  init() {
    this.user = {};
    this.setCredentials();
  },

  setCredentials() {
    let storedCredentials = {
      'access-token': localStorage.token,
      client: localStorage.client,
      expiry: localStorage.expiry,
      'token-type': localStorage.tokenType,
      uid: localStorage.uid
    };

    this.credentials = this.loggedIn() ? storedCredentials : {};
  },

  getInitialState: function() {
    return this.user;
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
    // auth headers
    let token = res.headers['access-token'];
    let client = res.headers['client'];
    let expiry = res.headers['expiry'];
    let tokenType = res.headers['token-type'];
    let uid = res.headers['uid'];

    // user
    this.user = res.body.user;
    let userId = this.user.id;

    // save data
    localStorage.token = token;
    localStorage.client = client;
    localStorage.expiry = expiry;
    localStorage.tokenType = tokenType;
    localStorage.uid = uid;
    localStorage.userId = userId;

    this.trigger(this.user);
    this.setCredentials();
    history.replaceState(null, '/home/dashboard');
  },

  onLoginCompleted(res) {
    this.logIn(res);
  },

  onLoginFailed(err) {
    this.trigger({ error: err.response.body.meta.errors.message });
  },

  onLogout() {
    request.delete('/api/v1/users/sign_out')
    .set(this.credentials)
    .end((err) => {
      if (err) {
        console.error('Logout error', err);
      } else {
        delete localStorage.token;
        delete localStorage.client;
        delete localStorage.expiry;
        delete localStorage.tokenType;
        delete localStorage.uid;
        delete localStorage.userId;

        this.user = {};
        this.credentials = {};

        this.trigger(this.user);
        history.replaceState(null, '/');
      }
    });
  }
});
