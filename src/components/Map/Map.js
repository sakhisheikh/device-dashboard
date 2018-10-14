/* eslint-disable */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import MapControl from './MapControl';
import MapBottomPage from './MapBottomPage';
import { labelStyling, lineCoordinatesStyling } from '../../utils/Constants';
// import './MarkerWithLabelPatch'; //google maps v3 eperimental open bug resolution - unmounting markerWithLabel

class Map extends Component {

  componentDidUpdate = () => {
    const { latitude, longitude } = this.props;
    const mapBounds = new google.maps.LatLngBounds();
    mapBounds.extend(new google.maps.LatLng(52.511991, 13.383959));
    latitude && longitude && mapBounds.extend(new google.maps.LatLng(latitude, longitude));
    this.refs.map.fitBounds(mapBounds);
  }


  render() {
    const { directions, latitude, longitude } = this.props;
    return (
      <GoogleMap
        defaultZoom={11}
        ref='map'
        defaultCenter={new google.maps.LatLng(52.511991, 13.383959)}
        defaultOptions={{
          gestureHandling: 'greedy',
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: true,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }}
      >
        <MapControl position={google.maps.ControlPosition.BOTTOM_CENTER}>
          <div>
            <MapBottomPage />
          </div>
        </MapControl>

        <MarkerWithLabel
          position={new google.maps.LatLng(52.511991, 13.383959)}
          labelAnchor={new google.maps.Point(75, 90)}
          labelStyle={labelStyling}
          defaultOpacity={1}
        // icon={{
        //   url: '/build/icon/markPin.svg',
        //   anchor: new google.maps.Point(5, 58),
        // }}
        >
          <div>
            Device Location
      </div>
        </MarkerWithLabel>

        {latitude && longitude && <MarkerWithLabel
          position={new google.maps.LatLng(latitude, longitude)}
          labelAnchor={new google.maps.Point(75, 90)}
          labelStyle={labelStyling}
          defaultOpacity={1}
        // icon={{
        //   url: '/build/icon/markPin.svg',
        //   anchor: new google.maps.Point(5, 58),
        // }}
        >
          <div>
            You're here
      </div>
        </MarkerWithLabel>}

        {directions && <Polyline
          path={directions}
          geodesic={false}
          options={lineCoordinatesStyling}
        />}

        {/* <Polylines
          lineCoordinates={lineCoordinates}
        >
          {({ polylines }) => (
            polylines
          )}
        </Polylines> */}
      </GoogleMap>
    );
  }
}

export default (withGoogleMap(Map));

