import React from 'react';
import Navbar from './navbar';

export default React.createClass({
  render() {
    return <div id="home-container">
      <Navbar />
      {this.props.children}
    </div>;
  }
});
