/* eslint-disable */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import MapControl from './MapControl';
import MapBottomPage from './MapBottomPage';
// import './MarkerWithLabelPatch'; //google maps v3 eperimental open bug resolution - unmounting markerWithLabel

class Map extends Component {
  render() {
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
          labelStyle={{
            clear: "both", display: "inline-block", backgroundColor: "#4e6a87", fontWeight: '500',
            color: "#FFFFFF", boxShadow: "0 6px 8px 0 rgba(63,63,63,0.11)", borderRadius: "30px",
            padding: "6px 16px", whiteSpace: "nowrap", width: "120px", textAlign: "center"
          }}
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

