import Reflux from 'reflux';
// import request from 'superagent';
import UserActions from '../actions/user';

export default Reflux.createStore({
  listenables: UserActions,

  onVerify(email) {
    console.log(email);
  }
});
