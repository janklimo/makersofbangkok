import React from 'react';

export default React.createClass({
  render() {
    return <div id="home-container">
      {this.props.children}
    </div>;
  }
});
