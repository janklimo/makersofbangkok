import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SigninModal from './signin_modal';
import AuthStore from '../../stores/auth';
import AuthActions from '../../actions/auth';

export default React.createClass({
  mixins: [ Reflux.connect(AuthStore) ],

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

  handleSignOut(e) {
    e.preventDefault();
    AuthActions.logout();
  },

  render() {
    let loggedIn = AuthStore.loggedIn();
    let authNavItem;
    if (loggedIn) {
      authNavItem = <NavItem eventKey={1} onClick={this.handleSignOut}
                      href="#">Sign Out</NavItem>;
    } else {
      authNavItem = <NavItem eventKey={1} onClick={this.openModal}
                      href="#">Sign In</NavItem>;
    }
    return <Navbar id="navbar-public" fixedTop toggleNavKey={0}>
      <Nav right eventKey={0}>
        {authNavItem}
      </Nav>
      <SigninModal show={this.state.showModal} onHide={this.closeModal}/>
    </Navbar>;
  }
});
