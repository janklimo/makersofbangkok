import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default React.createClass({
  render() {
    return <Navbar fixedTop toggleNavKey={0}>
      <Nav right eventKey={0}>
        <NavItem eventKey={1} href="#">Sign In</NavItem>
      </Nav>
    </Navbar>;

  }
});
