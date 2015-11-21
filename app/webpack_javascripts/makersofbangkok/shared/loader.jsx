import React from 'react';
import Reflux from 'reflux';
import LoaderStore from '../stores/loader';
import classNames from 'classnames';

export default React.createClass({
  mixins: [ Reflux.connect(LoaderStore) ],

  render() {
    let { loading } = this.state;
    let { display, showResult } = this.props;
    let loaderClass = classNames('heartbeat-loader', { hidden: !loading });
    let displayClass = classNames({ hidden: loading || !showResult });

    return <div className="result">
      <div className={loaderClass}></div>
      <p className={displayClass}>{display}</p>
    </div>;
  }
});

