import Reflux from 'reflux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthStore from '../../stores/auth';
import AuthActions from '../../actions/auth';
const s3 = 'https://s3-ap-southeast-1.amazonaws.com/makersofbangkok';

export default React.createClass({
  mixins: [ Reflux.connect(AuthStore) ],

  handleSignOut(e) {
    e.preventDefault();
    AuthActions.logout();
  },

  render() {
    return <Navbar className="navbar-home" fixedTop>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={this.handleSignOut} href="#">
            Sign Out
          </NavItem>
        </Nav>
      </Navbar.Collapse>
      <div className="logo-wrapper">
        <img id="navbar-logo" className="center-block"
          src={`${s3}/logo.png`} />
      </div>
    </Navbar>;
  }
});
