/* eslint-disable */
import React, { Component } from 'react';
import Map from './Map';
import Directions from '../../helpers/Directions';

class MapLayout extends Component {

  state = {
    latitude: '',
    longitude: '',
  }
    ._isMounted = false;


  componentDidMount() {
    this._isMounted = true;
    const options = {
      enableHighAccuracy: true,
    };

    if (navigator.geolocation && this._isMounted)
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError, options);
  }

  showPosition = ({ coords: { latitude, longitude } }) => {
    this.setState({ latitude, longitude });
    // debugger;
  };

  showError = error => {
    this.setState({ error });
  };

  render() {
    const { latitude, longitude } = this.state;
    return (
      <Directions
        {...{ latitude, longitude }}
      >
        {(({ directions }) => (
          <Map
            containerElement={<div style={{ height: '500px', width: '100%', borderRadius: '8px' }} />}
            mapElement={<div style={{ height: `100%`, borderRadius: '8px' }} />}
            {...{ directions, latitude, longitude }}
          />
        ))}
      </Directions>
    );

  }
}

export default MapLayout;
