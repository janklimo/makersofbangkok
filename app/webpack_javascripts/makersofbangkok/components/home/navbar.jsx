import Reflux from 'reflux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthStore from '../../stores/auth';
import AuthActions from '../../actions/auth';

export default React.createClass({
  mixins: [ Reflux.connect(AuthStore) ],

  handleSignOut(e) {
    e.preventDefault();
    AuthActions.logout();
  },

  render() {
    return <Navbar fixedTop toggleNavKey={0}>
      <Nav right eventKey={0}>
        <NavItem eventKey={1} onClick={this.handleSignOut} href="#">
          Sign Out
        </NavItem>
      </Nav>
    </Navbar>;
  }
});
