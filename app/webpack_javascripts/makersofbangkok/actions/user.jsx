import Reflux from 'reflux';

export default Reflux.createActions({
  verify: { asyncResult: true },
  register: { asyncResult: true },
  getUser: { asyncResult: true }
});
