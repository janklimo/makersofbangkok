import React from 'react';
import { Modal, Button } from 'react-bootstrap/lib';

export default React.createClass({
  render() {
    return <Modal show={this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>You&#39;re here!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Nehehe
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>;
  }
});

