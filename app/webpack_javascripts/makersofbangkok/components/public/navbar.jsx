import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SigninModal from './signin_modal';
import AuthStore from '../../stores/auth';
import AuthActions from '../../actions/auth';
import { Link } from 'react-router';
const s3 = 'https://s3-ap-southeast-1.amazonaws.com/makersofbangkok';

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
    let dashboardNavItem;

    let { top } = this.props;
    let navbarClass = top > 100 ? 'navbar-home' : null;

    if (loggedIn) {
      authNavItem = <NavItem eventKey={1} onClick={this.handleSignOut}
                      href="#">Sign Out</NavItem>;
      dashboardNavItem = <li>
        <Link className="highlight" to="/">Dashboard</Link>
      </li>;
    } else {
      authNavItem = <NavItem eventKey={1} onClick={this.openModal}
                      href="#">Sign In</NavItem>;
    }
    return <Navbar id="navbar-public" className={ navbarClass } fixedTop>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {dashboardNavItem}
          {authNavItem}
        </Nav>
      </Navbar.Collapse>
      <div className="logo-wrapper">
        <img id="navbar-logo" className="center-block"
          src={`${s3}/logo.png`} />
      </div>
      <SigninModal show={this.state.showModal} onHide={this.closeModal}/>
    </Navbar>;
  }
});
