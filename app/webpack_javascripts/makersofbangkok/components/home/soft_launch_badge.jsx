import includes from 'lodash/collection/includes';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default ({ id }) => {
  let attendeesIds = [1, 4, 9, 23, 24, 25];
  if (!includes(attendeesIds, id)) {
    return <span />;
  }

  const tooltip = (
    <Tooltip>You've attended our very first event!</Tooltip>
  );

  return <div id="soft-launch-badge">
    <OverlayTrigger placement="right" overlay={ tooltip }>
      <i className="fa fa-star"></i>
    </OverlayTrigger>
  </div>;
};

