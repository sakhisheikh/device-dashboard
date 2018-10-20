/* eslint-disable */
import React, { Component } from 'react';
import Map from './Map';
import Directions from '../../helpers/Directions';
import MapContext from './MapContext';

class MapLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      isDirection: false,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const options = {
      enableHighAccuracy: true,
    };

    if (navigator.geolocation && this._isMounted)
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError,
        options,
      );
  }

  showPosition = ({ coords: { latitude, longitude } }) => {
    this.setState({ latitude, longitude });
  };

  showError = error => {
    this.setState({ error });
  };

  onDirectionsAvailable = ({ isDirection }) => {
    this.toggleDirectionState(isDirection);
  };

  getDirections = ({ isDirection }) => () => {
    this.toggleDirectionState(isDirection);
  };

  toggleDirectionState = isDirection => {
    this.setState({
      isDirection,
    });
  };

  render() {
    const { latitude, longitude, isDirection } = this.state;
    return (
      <Directions
        {...{ latitude, longitude, isDirection }}
        onDirectionsAvailable={this.onDirectionsAvailable}
      >
        {({ directions }) => (
          <MapContext.Provider
            value={{ getDirections: this.getDirections, directions }}
          >
            <Map
              containerElement={
                <div
                  style={{
                    position: 'absolute',
                    height: '500px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '2px solid #00C49F',
                    overflow: 'hidden'
                  }}
                />
              }
              mapElement={
                <div style={{ height: `100%`, borderRadius: '8px' }} />
              }
              {...{ directions, latitude, longitude, isDirection }}
            />
          </MapContext.Provider>
        )}
      </Directions>
    );
  }
}

export default MapLayout;
