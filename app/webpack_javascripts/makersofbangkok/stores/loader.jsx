import Reflux from 'reflux';
import LoaderActions from '../actions/loader';

export default Reflux.createStore({
  listenables: [ LoaderActions ],
  init() {
    this.eventCounter = 0;
  },

  onLoad() {
    this.eventCounter = this.eventCounter + 1;
    this.trigger({loading: true});
  },

  onLoadCompleted() {
    this.eventCounter = this.eventCounter - 1;
    if (this.eventCounter === 0) {
      this.trigger({loading: false});
    }
  }
});
