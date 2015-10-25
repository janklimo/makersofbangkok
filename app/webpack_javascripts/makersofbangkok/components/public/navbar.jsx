import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SigninModal from './signin_modal';

export default React.createClass({
  getInitialState() {
    return {
      showModal: false
    };
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  openModal() {
    this.setState({ showModal: true });
  },

  render() {
    return <Navbar fixedTop toggleNavKey={0}>
      <Nav right eventKey={0}>
        <NavItem eventKey={1} onClick={this.openModal}
          href="#">Sign In</NavItem>
      </Nav>
      <SigninModal show={this.state.showModal} onHide={this.closeModal}/>
    </Navbar>;

  }
});
