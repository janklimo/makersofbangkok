import React from 'react/addons';
import { Input } from 'react-bootstrap/lib';

export default React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return <form className="form-horizontal">
      <Input type="text" label="First Name" labelClassName="col-xs-2"
        wrapperClassName="col-xs-10" />
      <Input type="text" label="Last Name" labelClassName="col-xs-2"
        wrapperClassName="col-xs-10" />
      <Input type="text" label="Password" labelClassName="col-xs-2"
        wrapperClassName="col-xs-10" />
    </form>;
  }
});
