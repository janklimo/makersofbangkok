import Reflux from 'reflux';
import RegistrationStore from '../../../stores/registration';
import RegistrationActions from '../../../actions/registration';
import CountDown from './countdown';
import find from 'lodash/collection/find';

export default React.createClass({
  render() {
    const { date, attendees, spotsLeft } = this.props;
    const userId = localStorage.userId;
    const attending = find(attendees, o => o.id === parseInt(userId, 10));

    return <div>
      { attending ? <div>
          <span className="teal">You're in!</span> See you in:
          <br />
          <CountDown date={ date } />
        </div> : <div>
          <Message spotsLeft={ spotsLeft } />
          <br />
          <CTA spotsLeft={ spotsLeft } date={ date }
            eventId={ this.props.eventId } />
        </div>
      }
    </div>;
  }
});

const Message = ({ spotsLeft }) => {
  let message = spotsLeft === 0 ?
    'The event is all booked out :( Stay tuned for the upcoming events!' :
    'Time left to register:';
  return <span>{ message }</span>;
};

const CTA = React.createClass({
  mixins: [ Reflux.connect(RegistrationStore) ],

  handleClick(e) {
    e.preventDefault();
    const eventId = this.props.eventId;
    const userId = localStorage.userId;
    RegistrationActions.createRegistration(userId, eventId);
  },

  render() {
    const { date, spotsLeft } = this.props;

    if (spotsLeft === 0) {
      return null;
    }

    return <div>
      <CountDown date={ date } />
      <a href="#" className="btn btn-main"
        onClick={ this.handleClick }>Sign Me Up!</a>
    </div>;
  }
});
