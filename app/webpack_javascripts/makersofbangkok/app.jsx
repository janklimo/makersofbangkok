import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import LandingPage from './components/public/landing_page';

ReactDOM.render((
  <Router>
    <Route path="/" component={LandingPage} />
  </Router>
), document.getElementById('app'));
