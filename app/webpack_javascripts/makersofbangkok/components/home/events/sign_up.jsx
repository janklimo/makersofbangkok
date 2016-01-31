import Reflux from 'reflux';
import RegistrationStore from '../../../stores/registration';
import RegistrationActions from '../../../actions/registration';
import CountDown from './countdown';
import find from 'lodash/collection/find';

export default React.createClass({
  mixins: [ Reflux.connect(RegistrationStore) ],

  handleClick(e) {
    e.preventDefault();
    const eventId = this.props.eventId;
    const userId = localStorage.userId;
    RegistrationActions.createRegistration(userId, eventId);
  },

  render() {
    const { date, attendees } = this.props;
    const userId = localStorage.userId;
    const attending = find(attendees, o => o.id === parseInt(userId, 10));

    return <div>
      { attending ? <div>
          <span className="teal">You're in!</span> See you in:
          <br />
          <CountDown date={ date } />
        </div> : <div>
          <span>Time left to register:</span>
          <br />
          <CountDown date={ date } />
          <a href="#" className="btn btn-main"
            onClick={ this.handleClick }>Sign Me Up!</a>
        </div>
      }
    </div>;
  }
});
