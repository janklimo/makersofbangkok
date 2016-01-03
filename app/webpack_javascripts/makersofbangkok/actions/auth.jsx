import Reflux from 'reflux';

export default Reflux.createActions({
  login: { asyncResult: true },
  logout: { asyncResult: true }
});
