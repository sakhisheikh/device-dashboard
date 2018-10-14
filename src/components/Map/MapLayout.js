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
    }
    this._isMounted = false;
  }

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
  };

  showError = error => {
    this.setState({ error });
  };

  getDirections = () => {
    console.log("Direction Called");
    this.setState(state => {
      return {
        isDirection: !state.isDirection,
      }
    })
  }

  render() {
    const { latitude, longitude, isDirection } = this.state;
    console.log("DIRECTION IN RENDER", this.state.isDirection)
    return (
      <MapContext.Provider value={{ getDirections: this.getDirections }}>
        <Directions
          {...{ latitude, longitude, isDirection }} getDirections={this.getDirections}
        >
          {(({ directions }) => (
            <Map
              containerElement={<div style={{ height: '500px', width: '100%', borderRadius: '8px' }} />}
              mapElement={<div style={{ height: `100%`, borderRadius: '8px' }} />}
              {...{ directions, latitude, longitude, isDirection }}
            />
          ))}
        </Directions>
      </MapContext.Provider>
    );

  }
}

export default MapLayout;
