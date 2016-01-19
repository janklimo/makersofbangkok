import PureComponent from 'react-pure-render/component';
import GoogleMap from 'google-map-react';

const Marker = () => {
  return <div>
    <div className="pin"></div>
    <div className="pulse"></div>
  </div>;
};

export default class VenueMap extends PureComponent {
  render() {
    let { venue } = this.props;
    let { latitude, longitude } = venue;
    let center = {
      lat: latitude,
      lng: longitude
    };
    return <div id="venue-map">
      <GoogleMap
        bootstrapURLKeys={{
          key: 'AIzaSyA3MDwyaeoqcRqZQdmlo2RmEw79wZNPGIs',
          language: 'en'
        }}
        defaultCenter={center}
        defaultZoom={15}>
        <Marker lat={latitude} lng={longitude} />
      </GoogleMap>
    </div>;
  }
}
