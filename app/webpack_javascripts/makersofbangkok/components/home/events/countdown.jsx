import React from 'react';
import moment from 'moment';
import 'moment-countdown';

export default React.createClass({
  componentDidMount() {
    this.tick();
    this.timer = setInterval(this.tick, 250);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  tick() {
    let { date } = this.props;
    this.setState({ date });
  },

  render() {
    return <div>
      Time left: { this.state ?
        moment(this.state.date).countdown().toString() :
          null }
        </div>;
  }
});

